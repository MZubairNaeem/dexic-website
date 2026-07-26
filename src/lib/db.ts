import pg from 'pg'

let pool: pg.Pool | undefined

export function getPool(): pg.Pool {
  if (!pool) {
    pool = new pg.Pool({ connectionString: import.meta.env.DATABASE_URL })
  }
  return pool
}
