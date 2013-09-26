<?php
/**
 * User: pwanwu
 * Date: 26/09/2013
 * Time: 15:12
 */

   $json = $_POST['json'];
   $info = json_encode($json);

   $file = fopen('new_map_data.json','w+');
   fwrite($file, $info);
   fclose($file);
?>