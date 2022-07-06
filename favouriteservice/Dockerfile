From java:8-jre
WORKDIR usr/src
ENV MYSQL_DATABASE=bookdb
ENV MYSQL_USER=book
ENV MYSQL_PASSWORD=root
ENV MYSQL_CI_URL=jdbc:mysql://localhost:3306/bookdb?useSSL=false
ADD ./target/favouriteservice-1.0.jar /usr/src/favouriteservice-1.0.jar
EXPOSE 8765
ENTRYPOINT ["java", "-jar", "favouriteservice-1.0.jar"]
