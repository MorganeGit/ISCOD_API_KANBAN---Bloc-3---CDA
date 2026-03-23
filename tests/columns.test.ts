
/* Écrire des tests avec Vitest et Supertest pour :
  * GET /api/columns
  * POST /api/columns
*/

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { Column } from '../src/models/Column.js';
import { createTestUser, getAuthToken, createTestColumn } from './helpers.js';
import './setup.js';

// Application Express utilisée pour les tests HTTP
const app = createApp();

describe('Columns routes', () => {

  it('GET /api/columns should return 200 and a JSON list of columns', async () => {

    // Création d'un utilisateur authentifié
    const user = await createTestUser();
    const token = getAuthToken(user);

    // Création de colonnes de test
    await createTestColumn('Done', 2);
    await createTestColumn('To Do', 0);
    await createTestColumn('In Progress', 1);

    // Requête API
    const response = await request(app)
      .get('/api/columns')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);

    expect(response.body).toHaveProperty('message', 'Columns retrieved successfully');
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data).toHaveLength(3);

    // Vérifie le tri par position
    expect(response.body.data[0].name).toBe('To Do');
    expect(response.body.data[1].name).toBe('In Progress');
    expect(response.body.data[2].name).toBe('Done');
  });

  it('POST /api/columns should return 201, JSON, and insert into MongoDB', async () => {

    const user = await createTestUser('columns-post@test.com');
    const token = getAuthToken(user);

    // Colonne existante pour tester l'incrément de position
    await createTestColumn('To Do', 0);

    const response = await request(app)
      .post('/api/columns')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'In Progress' });

    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/application\/json/);

    expect(response.body.data).toHaveProperty('name', 'In Progress');
    expect(response.body.data).toHaveProperty('position', 1);

    // Vérifie l'insertion
    const insertedColumn = await Column.findOne({ name: 'In Progress' });

    expect(insertedColumn).not.toBeNull();
    expect(insertedColumn?.position).toBe(1);
  });

});