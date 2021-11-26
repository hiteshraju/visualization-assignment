<?php 

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

$con = mysqli_connect("34.71.105.17","root","covid","covid");

$json = file_get_contents('php://input'); 	
$obj = json_decode($json,true);
$topic_area = $obj['topic_area'];
$query1 = mysqli_query($con, "SELECT * FROM areas ORDER BY count DESC");
$query2 = mysqli_query($con, "SELECT * FROM foods ORDER BY number DESC");
$query3 = mysqli_query($con, "SELECT * FROM online_analytics");

$i = 0;
$count = array();
$area = array();
while($row = mysqli_fetch_array($query1))
{
    array_push($count,$row['count']);
    array_push($area,$row['name']);
    $i++;
}

$message['count'] = $count;
$message['area'] = $area;

$number = array();
$food = array();
while($row2 = mysqli_fetch_array($query2))
{
    array_push($number,$row2['number']);
    array_push($food,$row2['food_type']);
}

$message['number'] = $number;
$message['food'] = $food;

$online = array();
$total = array();
while($row3 = mysqli_fetch_array($query3))
{
    array_push($online,$row3['online_order']);
    array_push($total,$row3['number']);
}

$message['online'] = $online;
$message['total'] = $total;

echo json_encode($message);






?>