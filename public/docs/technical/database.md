# 🗄️ SHELTR Database Configuration
*Version: 0.4.9 - December 22, 2024*

## Database Connection
```bash
# Production Database
PGHOST=db.oinjrlzuc1zztdstagqg.supabase.co
PGDATABASE=postgres
PGUSER=postgres
PGPASSWORD=[redacted]

# Connection String
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-ca-central-1.pooler.supabase.com:5432/postgres"
```

## Connection Details
- **Host**: aws-0-ca-central-1.pooler.supabase.com
- **Port**: 5432 (not 6543)
- **Pool Size**: 15 (Nano tier)
- **Max Connections**: 200

## Schema Structure
```sql
-- Core Tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role USER_ROLE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount DECIMAL NOT NULL,
  donor_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES shelters(id),
  status DONATION_STATUS DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feature Tables
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donation_id UUID REFERENCES donations(id),
  scanned_at TIMESTAMP WITH TIME ZONE,
  status QR_STATUS DEFAULT 'active'
);
```

## Security Implementation
- Row Level Security (RLS) enabled
- Role-based access policies
- Encrypted sensitive data
- Audit logging implemented

## Backup Configuration
- Daily automated backups
- Point-in-time recovery
- 30-day retention period
- Geographic redundancy

*For implementation details, see /docs/guides/best-practices.md*
