import { Injectable, OnModuleDestroy, OnModuleInit, ServiceUnavailableException } from '@nestjs/common';
import oracledb from 'oracledb';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool?: oracledb.Pool;

  async onModuleInit() {
    try {
      this.pool = await oracledb.createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECT_STRING,
        poolMin: 1,
        poolMax: 10,
        poolIncrement: 1,
      });
    } catch (error) {
      console.error('Oracle pool init failed; /benhnhan will be unavailable until DB is reachable.');
      console.error(error);
    }
  }

  async query(sql: string, binds: oracledb.BindParameters = {}) {
    const result = await this.execute(sql, binds);
    return result.rows ?? [];
  }

  async execute(sql: string, binds: oracledb.BindParameters = {}) {
    if (!this.pool) {
      throw new ServiceUnavailableException('Database unavailable');
    }
    const connection = await this.pool.getConnection();
    try {
      return await connection.execute(sql, binds, {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        autoCommit: true,
      });
    } finally {
      await connection.close();
    }
  }

  async onModuleDestroy() {
    await this.pool?.close();
  }
}
