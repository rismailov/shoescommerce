<?php

namespace Deployer;

require 'recipe/laravel.php';

// Config
set('repository', 'git@github.com:rismailov/shoescommerce.git');
set('keep_releases', 3);

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts
host('137.184.42.63')
    ->set('remote_user', 'dev')
    ->set('deploy_path', '/var/www/shoescommerce')
    ->setLabels([
        'env' => 'production',
    ]);

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
])->select('env=production');

// Hooks
after('artisan:optimize:clear', 'build');
after('deploy:failed', 'deploy:unlock');
