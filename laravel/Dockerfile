FROM php:8.4-fpm-alpine

WORKDIR /var/www

RUN apk add --no-cache sqlite-dev zip unzip git \
    && docker-php-ext-install pdo pdo_sqlite


COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader


COPY . .
RUN composer dump-autoload --optimize


RUN mkdir -p database storage/logs bootstrap/cache \
    && touch database/database.sqlite \
    && chown -R www-data:www-data /var/www \
    && chmod -R 775 storage bootstrap/cache database

EXPOSE 9000
CMD ["php-fpm"]
