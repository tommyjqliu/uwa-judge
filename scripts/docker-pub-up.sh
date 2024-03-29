cd /app/uwajudge
sudo cp /home/ec2-user/uwajudge.env .env
docker build -t uwajudge . 
docker-compose -f docker-compose.pub.yml -p uwajudge-pub up -d
