# envigor

envigor is a module that creates configuration objects for several
modules and backing services based on what environment variables are available.

This is useful for automatically deciding configuration options for
[twelve-factor apps](http://12factor.net/) that run in environments like
Heroku, where several different choices of addon can be provisioned to provide
the same service: calling `envigor` will check the environment variables for
all known services (and a general set of variables for any services that may be
set up manually / in-house), then create a config object that will run that
service regardless of provider (envigor objects can usually be passed directly
to the setup function of multiple drivers).

## Usage

Say you're making an Express app with MongoDB, that you're writing for a
service like Heroku, with addons like MongoLab to provide your more general
services like MongoDB. By using envigor, you can set your app up to find a
configured MongoDB service with complete service agnosticism:

```bash
npm install --save envigor mongodb
heroku addons:add mongolab
```

server.js:
```js
var http = require('http')
var cfg = require('envigor')();

var app = require('./app.js')(cfg);
http.createServer(app).listen(cfg.port || 5000, function() {
  console.log("Listening on " + port);
});
```

app.js:
```js
var express = require('express');
module.exports = function(cfg){
  var app = express();

  mongodb.MongoClient.connect(cfg.mongodb.url,function(err,db){
    if(err) throw err; else app.set('db',db)
  }

  // ...your routes here...

  return app;
}
```

## Names

The conventional names for the configuration variables queried for are based on
the variables and names used by services' Heroku addons, as well as example
variable names commonly used in setup documentation and tutorials.

Following this logic, envigor doesn't search for every possible permutation of
synonyms and underscores - only the ones it's reasonably likely to encounter
based on precedent. If a variable you set isn't getting picked up, check that
it's set at the *exact* name where envigor is looking for it, underscores and
all. (Specifically, note that *different services place underscores in
different places for the same phrases* , such as "APIKEY" and "API_KEY".)

Object names are primarily set based on most common phrasing across all
instances (such as "username" over "user" or "login"), followed by any
additional names used by other popular consumers (such as "user" for SMTP to
match the configuration names used by [Nodemailer][]). Specific services will
also often have other names set when a common variable name doesn't match the
primary name used by envigor.

[Nodemailer]: https://github.com/andris9/Nodemailer

Configurations that include services define a general configuration hash (such
as `cfg.redis`) in addition to all their services. If no specific values are
listed for the general configuration, it will use the first-listed service that
is defined in the environment for the definitions of the general configuration,
which will also include a `.service` field with the name of that service.

Default values are provided when part of a service is configured but not the
others, like an SMTP service without a hostname. However, objects and defaults
are not constructed if no service is specified.

## Base configuration options

In `index.js`, envigor only adds `port`, the value of the almost-inescapable
`PORT` variable, used for setting the port for a server to listen on.

Every other object in envigor is set by a script in `lib/cfg`, with a minimal
overview described below (read the files themselves for full details as to the
environment variables that can give the corresponding values).

## cors

Headers for Cross-Origin Resource Sharing. Goes great with
[ach](https://github.com/stuartpb/ach).

Note that allowOrigin and possibly maxAge are the only CORS configuration
parameters that are likely to be deployment-specific, and as such are the only
variables you should be setting through the environment / `envigor()`. While
the rest are gathered by envigor, it's mostly for symmetry; they're more likely
to be specific to your code, and as such should be ignored / clobbered by
static strings when you set up CORS.

**Adds:** cors, accessControl (alias of cors)

- allowOrigin
- allowCredentials
- exposeHeaders
- maxAge
- allowMethods
- allowHeaders

## email

**Adds:** smtp, mandrill, postmark, sendgrid, mailgun

### smtp

- username, user, auth.user
- password, pass, auth.pass
- hostname, host, server
- port
- service

### mandrill

[Mandrill](http://mandrill.com/) by MailChimp

- username
- apiKey, password

### postmark

https://postmarkapp.com

- apiKey
- inboundAddress

### sendgrid

SendGrid (http://sendgrid.com)

- username
- password

### mailgun

[Mailgun](http://www.mailgun.com/): Programmable Mail Servers

- apiKey
- smtp
  - username, user, login
  - password, pass
  - hostname, host, server
  - port

## mongodb

**Services:** [mongolab][], [mongohq][]

[mongolab]: https://mongolab.com/
[mongohq]: http://mongohq.com

- url, uri

## redis

**Services:** [rediscloud][], [redistogo][], [myredis][], [openredis][],
[redisgreen][]

[rediscloud]: http://redis-cloud.com/
[redistogo]: http://redistogo.com/
[myredis]: http://myredis.com/
[openredis]: https://openredis.com/
[redisgreen]: http://www.redisgreen.net/

- url
- hostname
- port
- password
- database

The individual fields will by default be gathered from url using the form
`redis://database:password@hostname:port` if url is defined: if not, url
will be constructed from these fields.

You can also set `DEFAULT_REDIS` to populate redis with all the default
values.

## memcache

**Services:** [memcachier][], [memcachedcloud][]

[memcachier]: https://www.memcachier.com/
[memcachedcloud]: http://garantiadata.com/memcached

- servers, as an array split on semicolons and commas in the defined
  variable. To reconstruct the string, use `servers.join(',')`.
- username
- password

You can also set `DEFAULT_MEMCACHE` to populate `memcache` with all the default
values.

## mysql

**Services:** [cleardb][]

[cleardb]: http://www.cleardb.com/

- url

## rabbitmq

**Services:** [rabbitmqBigwig][], [cloudamqp][]

[rabbitmqBigwig]: https://rabbitmq-bigwig.lshift.net/
[cloudamqp]: http://www.cloudamqp.com/

rabbitmq is also aliased as amqp.

- url
- tx.url
- rx.url

## rethinkdb

- hostname, host, server
- port
- database, db
- authKey, auth
- table

## postgresql

- url

Note that, while `DATABASE_URL` is conventionally used to refer to a PostgreSQL
database on Heroku, envigor **does not** use `DATABASE_URL` as a fallback
name for the PostgreSQL URL. If you wish to have this behavior, add this
line after your call to `require('envigor')();`.

```
cfg.postgresql = cfg.postgresql || cfg.database;
```

## database

The "database" hash, if present, contains the content of `env.DATABASE_URL` in
its url field.

Use of "database" / `DATABASE_URL` is discouraged, and is included primarily
for the use of applications with legacy configuration schemas.

Note that, while `DATABASE_URL` is conventionally used to refer to a PostgreSQL
database on Heroku, envigor **does not** use `DATABASE_URL` as a fallback
name for the PostgreSQL URL. See the section on `postgresql`.

## bitcoin

RPC interfaces for cryptocurrency daemons patterned after bitcoind

**Adds:** bitcoin, litecoin, dogecoin

- hostname, host
- port
- username, user
- password, pass

## amazonaws

Amazon Web Services

**Adds:** aws, s3

### aws

- accessKey
- secret

### s3

- accessKey, key
- secret
- bucket
- endpoint

## facebook

Facebook App configuration

- appId, clientId
- secret, clientSecret

## twitter

Twitter application OAuth credentials

- key, consumerKey
- secret, consumerSecret

## twilio

The [Twilio](http://www.twilio.com) cloud communications platform

- accountSid
- authToken
- number
