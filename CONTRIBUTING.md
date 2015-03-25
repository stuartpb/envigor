# Contributing to envigor

## Adding a service

Feel free to submit patches to add any service / interface you know well enough
to configure. Before doing so, read the guidelines below, and try to get a feel
for how things tend to be laid out by looking over the rest of the
documentation and code.

## Name guidelines

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

## Adding tests

Right now, envigor is kind of scant on tests, so feel free to add any tests
you feel are justified. Particularly, add any tests for issues that you
discover and/or fix.
