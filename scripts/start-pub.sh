cd /app/uwajudge
cp /home/ec2-user/uwajudge.env .env
sudo docker build -t uwajudge . 
sudo docker-compose -f docker-compose.pub.yml up -d
