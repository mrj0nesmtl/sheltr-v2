-- Insert sample shelter data
do $$
declare
  v_user_id uuid;
begin
  -- Create shelter admin accounts
  insert into auth.users (email, encrypted_password, email_confirmed_at)
  values 
    ('shelter1@example.com', crypt('password123', gen_salt('bf')), now()),
    ('shelter2@example.com', crypt('password123', gen_salt('bf')), now()),
    ('shelter3@example.com', crypt('password123', gen_salt('bf')), now()),
    ('shelter4@example.com', crypt('password123', gen_salt('bf')), now()),
    ('shelter5@example.com', crypt('password123', gen_salt('bf')), now())
  returning id into v_user_id;

  -- Insert shelter profiles
  insert into user_profiles (
    id,
    email,
    role,
    name,
    organization,
    registration_number,
    contact_phone,
    city,
    address,
    capacity,
    services,
    verified,
    emergency_contact,
    created_at
  ) values 
    (v_user_id, 'shelter1@example.com', 'shelter_admin', 'Hope Haven', 'Hope Haven Shelter', 'SH001', '+1-555-0101', 'New York', '123 Hope St, NY 10001', 150, array['Emergency Shelter', 'Food Services', 'Medical Care'], true, '{"name": "John Smith", "phone": "+1-555-0102", "email": "emergency1@example.com"}'::jsonb, now() - interval '6 months'),
    (v_user_id, 'shelter2@example.com', 'shelter_admin', 'Safe Harbor', 'Safe Harbor House', 'SH002', '+1-555-0201', 'Los Angeles', '456 Harbor Ave, LA 90012', 100, array['Transitional Housing', 'Job Training', 'Mental Health Services'], true, '{"name": "Jane Doe", "phone": "+1-555-0202", "email": "emergency2@example.com"}'::jsonb, now() - interval '3 months'),
    (v_user_id, 'shelter3@example.com', 'shelter_admin', 'New Beginnings', 'New Beginnings Center', 'SH003', '+1-555-0301', 'Chicago', '789 Fresh Start Rd, CH 60601', 75, array['Emergency Shelter', 'Substance Abuse Treatment', 'Case Management'], false, '{"name": "Bob Wilson", "phone": "+1-555-0302", "email": "emergency3@example.com"}'::jsonb, now() - interval '1 month'),
    (v_user_id, 'shelter4@example.com', 'shelter_admin', 'Helping Hands', 'Helping Hands Shelter', 'SH004', '+1-555-0401', 'Houston', '321 Help Ln, HO 77001', 200, array['Emergency Shelter', 'Food Services', 'Job Training', 'Medical Care'], true, '{"name": "Sarah Johnson", "phone": "+1-555-0402", "email": "emergency4@example.com"}'::jsonb, now() - interval '2 months'),
    (v_user_id, 'shelter5@example.com', 'shelter_admin', 'Unity House', 'Unity House Shelter', 'SH005', '+1-555-0501', 'Phoenix', '654 Unity Way, PH 85001', 125, array['Transitional Housing', 'Mental Health Services', 'Case Management'], false, '{"name": "Mike Brown", "phone": "+1-555-0502", "email": "emergency5@example.com"}'::jsonb, now() - interval '2 weeks');

  -- Insert sample participant counts
  insert into participants (user_id, name, qr_code, status)
  select 
    id,
    'Participant ' || generate_series(1, floor(random() * 50 + 25)::int),
    'QR-' || encode(gen_random_bytes(8), 'hex'),
    'active'
  from user_profiles
  where role = 'shelter_admin';

  -- Insert sample donations
  insert into donations (participant_id, amount, status, created_at)
  select 
    p.id,
    (random() * 100 + 20)::numeric(10,2),
    'completed',
    now() - (random() * interval '90 days')
  from participants p
  cross join generate_series(1, floor(random() * 20 + 10)::int);

end $$;