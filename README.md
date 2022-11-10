# Timemanager Security Audit

## Introduction

This document is a security audit of the Timemanager project. It is intended to be used by developers and users of the project to understand the security risks of the project.

## Security Audit

### Security Audit Summary

1. [Injections (XSS, Script, HTML, SQL, NoSQL, etc...)](#injections-xss-script-html-sql-nosql-etc)
2. [Accessible configuration files](#accessible-configuration-files)
3. [Password hashing](#password-hashing)
4. [Accessible routes and endpoints by authenticated and unauthenticated users](#accessible-routes-and-endpoints-by-authenticated-and-unauthenticated-users)
5. [JWT tokens (expiration, refresh, denial of service, etc...)](#jwt-tokens-expiration-refresh-denial-of-service-etc)
6. [Application available in HTTPS](#application-available-in-https)

### Injections (XSS, Script, HTML, SQL, NoSQL, etc...)

> XSS is a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.

> Script injection is a type of injection attack in which the goal is execution of arbitrary commands on the host operating system via a vulnerable application. Command injection attacks are possible when an application passes unsafe user supplied data (forms, cookies, HTTP headers etc.) to a system shell. In this attack, the attacker-supplied operating system commands are usually executed with the privileges of the vulnerable application. Command injection attacks are possible largely due to insufficient input validation.

> HTML injection is a type of injection attack in which the goal is execution of arbitrary HTML and script code in a browser via a vulnerable web application. HTML injection attacks are possible when an application passes unsafe user supplied data (forms, cookies, HTTP headers etc.) to a web browser. In this attack, the attacker-supplied HTML and script code are usually executed with the privileges of the vulnerable application. HTML injection attacks are possible largely due to insufficient input validation.

> SQL injection is a code injection technique, used to attack data-driven applications, in which nefarious SQL statements are inserted into an entry field for execution (e.g. to dump the database contents to the attacker). SQL injection must exploit a security vulnerability in an application's software, for example, when user input is either incorrectly filtered for string literal escape characters embedded in SQL statements or user input is not strongly typed and unexpectedly executed. SQL injection is mostly known as an attack vector for websites but can be used to attack any type of SQL database.

> NoSQL injection is a type of injection attack in which the goal is execution of arbitrary commands on the host operating system via a vulnerable application. NoSQL injection attacks are possible when an application passes unsafe user supplied data (forms, cookies, HTTP headers etc.) to a NoSQL database. In this attack, the attacker-supplied operating system commands are usually executed with the privileges of the vulnerable application. NoSQL injection attacks are possible largely due to insufficient input validation.

### Accessible configuration files

Configuration files are ignored by git and are not pushed to the repository. They are not accessible by the public.

### Password hashing

The password is hashed using the `bcrypt` algorithm. We are using the `bcrypt` algorithm because it is the most secure algorithm available for password hashing. The `bcrypt` algorithm is a one-way function, which means that it is impossible to decrypt the password from the hash.

Login, register and update on a user are the only routes that require a password. The password is hashed before being stored in the database.

### Accessible routes and endpoints by authenticated and unauthenticated users

The only routes that are accessible by unauthenticated users are the login and register. All the other routes are accessible only by authenticated users using `Guardian` and `JWT` tokens.

### JWT tokens (expiration, refresh, denial of service, etc...)

We are using `Guardian` and `JWT` tokens to authenticate users. 

The JWT token is valid for 1 minute. After 1 minute, the user will have to log in again to get a new token.

A refresh token is also stocked in a cookie. The refresh token is valid for 1 week. After 1 week, the user will have to log in again to get a new token.
The refresh token is refreshed every time the user logs in.

### Application available in HTTPS

It is only available in HTTP. The application is not available in HTTPS because it is not deployed on a server. It is only available locally on the developer's computer.

We are estimated that is a high risk to deploy this application on a server before we have fixed and tested the security issues, because the application is in work in progress and is not stable yet, and it will open the door to hackers.