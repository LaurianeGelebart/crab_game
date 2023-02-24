<?php
    include("acces_BDD.php");
    session_start();
    
    
    if(isset($_POST['connexion'])){
        
        if(!empty($_POST['Pseudo']) AND !empty($_POST['Motdepasse'])){
            $Pseudo = htmlspecialchars($_POST['Pseudo']);
            $Motdepasse= htmlspecialchars($_POST['Motdepasse']);
            $Motdepasse=hash('sha256',$Motdepasse);
            
            $q=$BDD->prepare('SELECT * FROM utilisateur WHERE Pseudo = ? AND Motdepasse = ?');
            $q->execute(array($Pseudo,$Motdepasse)); 
            if($q->rowCount() > 0){
                $_SESSION['Pseudo']=$Pseudo;
                $_SESSION['Motdepasse']=$Motdepasse;
                $result=$q->fetch();
                $_SESSION['IdUtilisateur']=$result['IdUtilisateur'];
                header('Location: jeu.php'); 
            }else{
                echo 'Le Pseudo ou le mot de passe ne correspond pas. ';
            }
        }

    }
    

    if(isset($_POST['inscription'])){
       
        if(!empty($_POST['Pseudo']) AND !empty($_POST['Motdepasse'])AND !empty($_POST['Confirmermotdepasse'])){
            $Pseudo = (String) trim($_POST['Pseudo']);
            $Motdepasse=(String) trim($_POST['Motdepasse']);
            $Confirmermotdepasse=(String) trim($_POST['Confirmermotdepasse']);
            if($Motdepasse==$Confirmermotdepasse){
                $q=$BDD->prepare('SELECT Pseudo FROM utilisateur WHERE Pseudo=?');
                $q->execute(array($Pseudo));
                if($q->rowCount()==0){
                    $Motdepasse=hash('sha256',$Motdepasse);
                    $q=$BDD->prepare('INSERT INTO utilisateur(Pseudo,Motdepasse) VALUES (?,?)');
                    $q->execute(array($Pseudo,$Motdepasse));
                    header('Location: jeu.php'); 
                }
                else{
                    echo 'Un compte existe déjà avec ce pseudo';
                }

            }else{
                echo 'Les mots de passe sont différents';
            }
        }
 
    }

    if(isset($_SESSION['IdUtilisateur'])){
        if(isset($_COOKIE["points"])){
            $Score = $_COOKIE["points"] ;
             $q=$BDD->prepare('SELECT Score FROM utilisateur WHERE IdUtilisateur=?');
             $q->execute(array($_SESSION['IdUtilisateur']));
             $result = $q->fetch();
             if($result['Score']<$Score){
                 $q=$BDD -> prepare('UPDATE utilisateur SET Score=? WHERE IdUtilisateur = ?');
                 $q->execute(array($Score,$_SESSION['IdUtilisateur']));
             }
         }
    }
   


?>


<!doctype html>
<html lang="fr">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Site Metas -->
    <title>Chateau - Jeu</title>
    <meta name="description" content="Site officiel du Chateau d'Ouessant. Pour découvrir de manière ludique l'histoire de ce lieu d'exception.">
	<meta name="author" content="Propriétaires de chateau">


    <!-- Site Icons -->
    <link rel="shortcut icon" href="images/fav.png" type="image/x-icon" />

    <!-- Site CSS -->
    <link rel="stylesheet" href="style.css">

    <!-- Script -->
    <script src="script.js"></script>
    <script src="game.js"></script>

    <!-- Font -->
    <link href="http://fonts.cdnfonts.com/css/ming" rel="stylesheet">
    <link href="http://fonts.cdnfonts.com/css/perfect-dark-brk" rel="stylesheet">            

</head>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LWJW34RJJ8%22%3E"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-LWJW34RJJ8');
</script>

<body class="jeu">

    <?php  require_once("navbar.php"); ?>
    <div class="jeuBackground">
        <main>
            <div class="ordi">
                <?php if(!(isset($_SESSION['IdUtilisateur']))) { ?>
                <section id="connexion" class="connexion">
                    <h1 class="title">Pour jouer connecte toi ;)</h1>
                    <form method="post">
                        <input type="text" name="Pseudo" placeholder="Pseudo" value="<?php if (isset($Pseudo)) echo $Pseudo; ?>"
                            required="required">
                        <input type="password" name="Motdepasse" placeholder="Mot de passe"
                            value="<?php if (isset($Motdepasse)) echo $Motdepasse; ?>" required="required">
                        <input class="btn" type="submit" name="connexion" value="Se connecter">
                    </form>
                    <p id="go-inscription" class="go">Pas encore inscrit ?</p>
                </section>

                <section id="inscription" class="inscription un-display">
                    <h1 class="title">Inscription</h1>
                    <form method="post">
                        <input type="text" name="Pseudo" placeholder="Pseudo" value="<?php if (isset($Pseudo)) echo $Pseudo; ?>"
                            required="required">
                        <input type="password" name="Motdepasse" placeholder="Mot de passe"
                            value="<?php if (isset($Motdepasse)) echo $Motdepasse; ?>" required="required">
                        <input type="password" name="Confirmermotdepasse" placeholder="Confirmer le mot de passe"
                            value="<?php if (isset($Confirmermotdepasse)) echo $Confirmermotdepasse; ?>" required="required">
                        <input class="btn" type="submit" name="inscription" value="S'inscrire">
                    </form>
                    <p id="go-connexion" class="go">Déjà inscrit finalement ?</p>
                </section>

                <?php } else { ?>
                <section class="game">
                    <canvas id="canvas" class="canvas" width="1500" height="750">
                    </canvas>
                </section>         
                <?php } ?>
            </div>
            

            <div class="phone">  
                 <h2 class="title2"> Dommage vous êtes sur téléphone, impossible d'entrer au tableau des légendes de la sorte... <br> Allez sur un ordinateur !  </h2>
            </div>

            <section class="table">
                <h1 id="title-turn" class="title titleLeaderboard"> Leaderboard </h1>
                <table>
                    <thead>
                        <tr>
                            <th> Pseudo </th>
                            <th> Score </th>
                        </tr>
                    </thead>
                    <tbody>          
                    <?php 
                    $q=$BDD->prepare('SELECT * FROM utilisateur WHERE Score > 0 ORDER BY Score DESC');
                    $q->execute(array()); 
                    foreach($q as $ligne){ ?>
                        <tr>
                            <td class="pseudoLeaderBoard">
                                <?php echo $ligne['Pseudo']; ?>
                            </td>
                            <td>
                                <?php echo $ligne['Score'];?>
                            </td>
                        </tr>
                     <?php } ?>
                    </tbody>
                </table>
            </section>
        
        </main>
    </div>
</body>