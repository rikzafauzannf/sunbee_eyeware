// scripts/db-setup.ts
import 'dotenv/config';
import { setupDatabase } from '@/lib/db_setup';

(async () => {
  try {
    const result = await setupDatabase();
    console.log('✅ Database setup result:', result);
  } catch (err) {
    console.error('❌ Failed to setup database:', err);
    process.exit(1);
  }
})();
