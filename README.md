# Url-Shortener

Small API shortening an input URL.

## API Request

### /generate
- **Method** : POST
- **Parameters** :
    - *url*: The url to shortened. This URL must be valid. See the package [valid-url](https://www.npmjs.com/package/valid-url) for more informations.
    - *baseShortUrl* (optional): The domain name and/or the context of the generated short url. This parameter must respect the regex `https?:\/\/[a-z\.]+\.(com|fr)(\/[a-z\/]*)?`

### /s/:urlCode
- **Method** : GET
- **Parameters** :
    - *urlCode*: the identifier of the short-url generated with the `/generate` API.

## Tips
You can use a web server (Apache, Ngninx, ...) to create short-url with your domain name.

Apache
```apache
RewriteRule ^/short/(.*)$ http://shorturl-domain.com/s/$1
```

Nginx
```nginx
location ~^/short/(.*) {
    rewrite ^/short/(.*)$ http://shorturl-domain.com/s/$1 redirect;
}
```
