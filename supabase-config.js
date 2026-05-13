/* ============================================
   HEREJAIBAS | Supabase Config
   Reemplaza SUPABASE_URL y SUPABASE_ANON_KEY
   con los valores de tu proyecto en supabase.com
   ============================================ */

const SUPABASE_URL  = 'https://ygnmhhbccdmpcvqfuajg.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlnbm1oaGJjY2RtcGN2cWZ1YWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MjkwODEsImV4cCI6MjA5NDIwNTA4MX0.2m2VC1IwV74sDF2J7uWSGNn8dn2qMKHp1MB0e_E0kWU';

// Cliente Supabase (se inicializa en cada página que lo use)
// No modifiques esto
window._sbUrl  = SUPABASE_URL;
window._sbAnon = SUPABASE_ANON;