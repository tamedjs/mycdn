MYCA=localhost-ca
NAME=localhost # Use your own domain name

# subject=
# C = US,
# ST = Arizona,
# L = Phoenix,
# O = "The TRG, LLC",
# OU = MyCDN,
# CN = localhost,
# emailAddress = info@thetrg.org

cd security/certificate

# ######################
# # Become a Certificate Authority
# ######################
#
# # Generate private key
# openssl genrsa -des3 -out $MYCA.key 2048
#
# # Generate root certificate
# openssl req -x509 -new -nodes -key $MYCA.key -sha256 -days 825 -out $MYCA.pem
#
# ######################
# # Create CA-signed certs
# ######################
#
# # Generate a private key
# openssl genrsa -out $NAME.key 2048
#
# # Create a certificate-signing request
# openssl req -new -key $NAME.key -out $NAME.csr
#
# # Create a config file for the extensions
# >$NAME.ext cat <<-EOF
# authorityKeyIdentifier=keyid,issuer
# basicConstraints=CA:FALSE
# keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
# subjectAltName = @alt_names
# [alt_names]
# DNS.1 = $NAME # Be sure to include the domain name here because Common Name is not so commonly honoured by itself
# DNS.2 = dev.$NAME # Optionally, add additional domains (I've added a subdomain here)
# IP.1 = 127.0.0.1 # Optionally, add an IP address (if the connection which you have planned requires it)
# EOF
#
# # Create the signed certificate
# openssl x509 -req -in $NAME.csr -CA $MYCA.pem -CAkey $MYCA.key -CAcreateserial \
# -out $NAME.crt -days 825 -sha256 -extfile $NAME.ext

openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
# rm csr.pem

# subject=C = US, ST = Arizona, L = Phoenix, O = "The TRG, LLC", OU = TamedJs, CN = localhost, emailAddress = thetrg.org@gmail.com
# Getting Private key
