import sys
sys.path.append('.')  # Bulunduğun dizini ekle

from app.database.db import get_connection

conn = get_connection()
print("✅ Veritabanı bağlantısı BAŞARILI!")
conn.close()
