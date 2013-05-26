# envigor

envigor is a module that creates a configuration object based on what
environment variables are available. This is useful for consolidating possible
configuration options for apps that run in

(It was originally 'enviguration', which made equally no sense and was
consequently thrown out for being needlessly long.)

## Contributing

Feel free to submit patches to add any service / interface you know well enough
to configure. Before doing so, try to get a feel for how things tend to be
laid out by looking over the rest of the documentation and code.

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

In lieu of any interface-specific confuration options (eg. SMTP_PASSWORD),
services that provide general interfaces (eg. SMTP or MongoDB) are used to set
that interface's configuration options. In the (uncommon) event that more than
one service that provides a specific interface has a defined configuration,
precedence is defined in an arbitrary order roughly based on who I like best
(the order used in this documentation).

## Generalized configuration options

### port

The value of the almost-inescapable `PORT` variable, used for setting the port
for a server to listen on.

### smtp

**Provided by:** mandrill, postmark, sendgrid, mailgun

- **username:** `SMTP_USERNAME` || mandrill.username || postmark.apiKey
  || sendgrid.username || mailgun.smtp.username
- **user:** Same as **username** (to match [Nodemailer][]).
- **password:** `SMTP_PASSWORD` || mandrill.apiKey || postmark.apiKey
  || sendgrid.password || mailgun.smtp.password
- **pass:** Same as **password** (to match [Nodemailer][]).
- **hostname:** `SMTP_HOSTNAME` || `SMTP_HOST` || `SMTP_SERVER`
  || 'smtp.mandrillapp.com' (mandrill) || 'smtp.postmarkapp.com' (postmark)
  || 'smtp.sendgrid.net' (sendgrid)
  || (mailgun.smtp.hostname || 'smtp.mailgun.org') (mailgun)
- **host:** Same as **hostname** (to match [Nodemailer][]).
- **server:** Same as **hostname** (to match `SMTP_SERVER`).
- **port:** `SMTP_PORT` || '587' (mandrill, sendgrid) || '2525' (postmark)
  || (mailgun.smtp.port || '587') (mailgun)
- **service:** `SMTP_SERVICE` || 'mandrill', 'postmark', 'sendgrid', or
  'mailgun', depending on which service (if any) is being used.

### mongodb

**Provided by:** mongolab, mongohq

- **url:** `MONGODB_URL` || mongolab.url || mongohq.url

## Service-specific options

### aws

Amazon Web Services

- **accessKey**: `AWS_ACCESS_KEY_ID` || `AWS_ACCESS_KEY`
- **secret**: `AWS_SECRET` || `AWS_SECRET_KEY` || `AWS_SECRET_ACCESS_KEY`

### s3

Amazon's ubiquitous S3 service.

- **accessKey**: `S3_ACCESS_KEY` || `S3_KEY` || aws.accessKey
- **secret**: `S3_SECRET` || `S3_SECRET_KEY` || aws.secret
- **bucket**: `S3_BUCKET` || `S3_BUCKET_NAME`
- **endpoint**: `S3_ENDPOINT` || 's3.amazonaws.com'

### facebook

Facebook App configuration

- **appId**: `FACEBOOK_APP_ID`
- **secret**: `FACEBOOK_SECRET` || `FACEBOOK_APP_SECRET`

### mandrill

Mandrill by MailChimp

**Provides:** smtp

- **username:** `MANDRILL_USERNAME`
- **password:** `MANDRILL_APIKEY`

### postmark

https://postmarkapp.com

**Provides:** smtp

- **apiKey:** `POSTMARK_API_KEY`
- **inboundAddress:** `POSTMARK_INBOUND_ADDRESS`

### sendgrid

SendGrid (http://sendgrid.com)

**Provides:** smtp

- **username:** `SENDGRID_USERNAME`
- **password:** `SENDGRID_PASSWORD`

### mailgun

The Mailgun Automation Engine.

**Provides:** smtp

- **apiKey:** `MAILGUN_API_KEY`
- **smtp**:
    - **username:** `MAILGUN_SMTP_LOGIN`
    - **user:** Same as **username** (to match [Nodemailer][]).
    - **login:** Same as **username** (to match `MAILGUN_SMTP_LOGIN`).
    - **password:** `MAILGUN_SMTP_PASSWORD`
    - **pass:** Same as **password** (to match [Nodemailer][]).
    - **hostname:** `MAILGUN_SMTP_SERVER`
    - **host:** Same as **hostname** (to match [Nodemailer][]).
    - **server:** Same as **hostname** (to match `MAILGUN_SMTP_SERVER`).
    - **port:** `MAILGUN_SMTP_PORT`

### mongolab

MongoLab MongoDB-as-a-Service - https://mongolab.com/

**Provides:** mongodb

- **url:** `MONGOLAB_URI`
- **uri:** Same as **url** (to match `MONGOLAB_URI`).

### mongohq

http://mongohq.com

**Provides:** mongodb

- **url:** `MONGOHQ_URL`
