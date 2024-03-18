cd /app/nextjs
docker build -t uwajudge . 
docker-compose -d -f docker-compose.pub.yml up
