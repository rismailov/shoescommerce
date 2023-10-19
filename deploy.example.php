<?php

/**
 * This is an example "deploy.php" file that you should create in the project root
 * and update the file according to your needs in order to deploy this website.
 *
 * More info: https://deployer.org/
 */

namespace Deployer;

require 'recipe/laravel.php';

// Config
set('repository', 'git@github.com:rismailov/shoescommerce.git');
set('keep_releases', 3);

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts
host('__YOUR HOSTNAME__')
    ->set('remote_user', 'dev')
    ->set('deploy_path', '__PATH TO PROJECT IN VPS__');

// Tasks
task('build', function () {
    run('cd {{release_path}} && yarn install && yarn build');
});

task('deploy', [
    'deploy:prepare',
    'deploy:vendors',
    'artisan:storage:link',
    'artisan:config:cache',
    'artisan:route:cache',
    'artisan:view:cache',
    'artisan:event:cache',
    'artisan:optimize:clear',
    // 'artisan:migrate',
    'deploy:publish',
]);

// Hooks
after('artisan:optimize:clear', 'build');
after('deploy:failed', 'deploy:unlock');
