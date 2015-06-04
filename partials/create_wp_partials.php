<?php
// This file interprets a list of Cascade PHP templates and outputs
// static HTML files from those templates


// The navListItem function created for Cascade assumes that a relative path will suffice
// since blogs is on a subdomain, we need to modify this function to create a full path URL
function navListItem($pageStartsWith, $test_starts_with, $path, $label, $classes='', $baseUrl='//www.bethel.edu'){
    if(!strpos($path, ':')) {
        $path = $baseUrl . $path;
    }
    echo '<li>';
    if($classes){
        if($pageStartsWith == $test_starts_with){
            echo "<a class='$classes active' href='$path'>$label</a>";
        }else{
            echo "<a class='$classes' href='$path'>$label</a>";
        }
    }else{
        if($pageStartsWith == $test_starts_with){
            echo "<a class='active' href='$path'>$label</a>";
        }else{
            echo "<a href='$path'>$label</a>";
        }
    }
    echo '</li>';
}

function createPartial($filepath) {
	ob_start();
	include($filepath);
	$partial = ob_get_contents();
	ob_end_clean();
	return $partial;
}

$filepaths = array(
	'/var/www/cms.pub/_cascade/templates/responsive/includes/head/head.php',
	'/var/www/cms.pub/_cascade/templates/responsive/includes/body-start/body-start.php',
	'/var/www/cms.pub/_cascade/templates/responsive/includes/toolbox/toolbox.php',
	'/var/www/cms.pub/_cascade/templates/responsive/includes/global-header/global-header.php',
	'/var/www/cms.pub/_cascade/templates/responsive/includes/footer/footer.php',
	'/var/www/cms.pub/_cascade/templates/responsive/includes/body-end/body-end.php'
);

foreach($filepaths as $filepath) {
	$filepathArray = explode('/', $filepath);
	$filename = end($filepathArray);
	$filename = substr($filename, 0, strpos($filename, '.'));
	$filename .= '.html';
	$partial = createPartial($filepath);
	file_put_contents($filename, $partial);
}
