<?php
include 'database.php';
if(count($_POST)>0){
	if($_POST['type']==1){
		$name=$_POST['name'];
		$email=$_POST['email'];
		$designation=$_POST['designation'];
		$salary=$_POST['salary'];
		$date=$_POST['date'];
		$sql = "INSERT INTO `crud`( `name`, `email`,`designation`,`salary`,`date`) 
		VALUES ('$name','$email','$designation','$salary','$date')";
		if (mysqli_query($conn, $sql)) {
			echo json_encode(array("statusCode"=>200));
		} 
		else {
			echo "Error: " . $sql . "<br>" . mysqli_error($conn);
		}
		mysqli_close($conn);
	}
}
if(count($_POST)>0){
	if($_POST['type']==2){
		$id=$_POST['id'];
		$name=$_POST['name'];
		$email=$_POST['email'];
		$designation=$_POST['designation'];
		$salary=$_POST['salary'];
		$date=$_POST['date'];
		$sql = "UPDATE `crud` SET `name`='$name',`email`='$email',`designation`='$designation',`salary`='$salary',`date`='$date'  WHERE id=$id";
		if (mysqli_query($conn, $sql)) {
			echo json_encode(array("statusCode"=>200));
		} 
		else {
			echo "Error: " . $sql . "<br>" . mysqli_error($conn);
		}
		mysqli_close($conn);
	}
}
if(count($_POST)>0){
	if($_POST['type']==3){
		$id=$_POST['id'];
		$sql = "DELETE FROM `crud` WHERE id=$id ";
		if (mysqli_query($conn, $sql)) {
			echo $id;
		} 
		else {
			echo "Error: " . $sql . "<br>" . mysqli_error($conn);
		}
		mysqli_close($conn);
	}
}
if(count($_POST)>0){
	if($_POST['type']==4){
		$id=$_POST['id'];
		$sql = "DELETE FROM crud WHERE id in ($id)";
		if (mysqli_query($conn, $sql)) {
			echo $id;
		} 
		else {
			echo "Error: " . $sql . "<br>" . mysqli_error($conn);
		}
		mysqli_close($conn);
	}
}

?>