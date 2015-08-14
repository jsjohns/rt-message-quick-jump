set -euo pipefail

sudo apt-get update
echo $?
sudo apt-get install -y sqlite3 rt4-clients build-essential libexpat1-dev libexpat1
echo $?
(echo y; echo o conf prerequisites_policy follow; echo o conf commit) | cpan
wget https://download.bestpractical.com/pub/rt/release/rt-4.2.11.tar.gz
tar xvf *.tar.gz
cd rt-*
./configure --with-db-type=SQLite
printf "\n" | sudo make fixdeps
sudo make install
exit
sudo tee /opt/rt4/etc/RT_SiteConfig.pm > /dev/null <<'EOF'
Set( $MailCommand, 'testfile');
1;
EOF
sudo tee /etc/rc.local > /dev/null <<'EOF'
dhclient eth0
/opt/rt4/sbin/rt-server --port 8080
exit 0
EOF
printf "\n" | sudo make initialize-database
#nohup sudo /opt/rt4/sbin/rt-server --port 8080 2> /dev/null &
