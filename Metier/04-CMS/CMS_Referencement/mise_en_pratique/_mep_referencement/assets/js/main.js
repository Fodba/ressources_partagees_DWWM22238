$(function() {
    
    function fileNameUpload() {
        $(this).next().text(this.files[0].name);
        //files propriété d'un input qui retourne une liste de fichier (FileList), this.files[0]
        //retourne le fichier à l'index 0
    }
    
    $('#ppic').change(fileNameUpload);
    //Change event : quand la value d'un élément change (input, textarea, select, checkbox, radio...)
    
    //Succinct, text truncate
    $('.card-deck .card-text').succinct({
        size: 70
    });
    
    //Scroll avec ancres
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
        }
    });//Fin scroll avec ancre

    $('#loggoutModal').modal('show'); //Montre ma modal par défaut, elle sera visible qu'après une déconnexion
        
});