import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(
    `
      ALTER TABLE APPLICATION.user RENAME organizations TO organization;
      ALTER TABLE APPLICATION.user ALTER COLUMN organization TYPE TEXT
        USING CASE
          WHEN organization[1] IS NULL THEN 'test-group-id-1'
          WHEN organization[1] IS NOT NULL THEN organization[1]
        END;
    `,
  );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  // TODO
}
