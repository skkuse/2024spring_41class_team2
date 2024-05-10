

$(document).ready(function () {

    var backgrounds = [
        'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(/assets/eximg1.png)',
        'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(/assets/eximg2.png)',
        'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(/assets/eximg3.png)',
    ];

    var currentBackground = 0;
    $('#prev1').click(function () {
        currentBackground = (currentBackground + 4) % backgrounds.length;
        $('#imgs_ver1').css('background-image', backgrounds[currentBackground]);
        $('#imgs_ver2').css('background-image', backgrounds[currentBackground]);
        
    });
    $('#next1').click(function () {
        currentBackground = (currentBackground + 1) % backgrounds.length;
        $('#imgs_ver1').css('background-image', backgrounds[currentBackground]);
        $('#imgs_ver2').css('background-image', backgrounds[currentBackground]);
        
    });
    $('#prev2').click(function () {
        currentBackground = (currentBackground + 4) % backgrounds.length;
        $('#imgs_ver1').css('background-image', backgrounds[currentBackground]);
        $('#imgs_ver2').css('background-image', backgrounds[currentBackground]);
        
    });
    $('#next2').click(function () {
        currentBackground = (currentBackground + 1) % backgrounds.length;
        $('#imgs_ver1').css('background-image', backgrounds[currentBackground]);
        $('#imgs_ver2').css('background-image', backgrounds[currentBackground]);
        
    });

    $('#b1').click(function () {
        $('#main_1 ,#main_bar').fadeOut(400, function(){
            $('#login_div').fadeIn(400);
            $('#login_div').css('display','flex');
            $('#content_wrapper').css('height','60vh');
        });
        $('#login_username').val("");
        $('#login_pw').val("");
        $('#login_username').css('border-bottom', '2px solid #ffffff');
        $('#login_pw').css('border-bottom', '2px solid #ffffff');
        $(login_text_username).css('visibility', 'hidden');
        $(login_text_pw).css('visibility', 'hidden');
        

    });

    $('#b2').click(function () {
        $('#main_1 ,#main_bar').fadeOut(400, function(){
            $('#signup_div').fadeIn(400);
            $('#signup_div').css('display','flex');
            $('#content_wrapper').css('height','75vh');
        });
        $('#signup_username').val("");
        $('#signup_pw').val("");
        $('#signup_email').val("");
        $('#signup_cpw').val("");
        $('#signup_email').css('border-bottom', '2px solid #ffffff');
        $('#signup_pw').css('border-bottom', '2px solid #ffffff');
        $('#signup_username').css('border-bottom', '2px solid #ffffff');
        $('#signup_cpw').css('border-bottom', '2px solid #ffffff');
        $(signup_text_username).css('visibility', 'hidden');
        $(signup_text_pw).css('visibility', 'hidden');
        $(signup_text_email).css('visibility', 'hidden');
        $(signup_text_cpw).css('visibility', 'hidden');
    });

    $('#back_button_login').click(function () {
        $('#login_div').fadeOut(400, function(){
            $('#main_bar').fadeIn(400);
            $('#main_1').fadeIn(400);
            $('#login_div').css('display','none');
            $('#content_wrapper').css('height','50vh');
            
        });

    });

    $('#back_button_signup').click(function () {
        $('#signup_div').fadeOut(400, function(){
            $('#main_bar').fadeIn(400);
            $('#main_1').fadeIn(400);
            $('#signup_div').css('display','none');
            $('#content_wrapper').css('height','50vh');
            
        });

    });

    $('#back_button_signup_sucess').click(function () {
        $('#signup_sucess_div').fadeOut(400, function(){
            $('#main_bar').fadeIn(400);
            $('#main_1').fadeIn(400);
            $('#signup_sucess_div').css('display','none');
            $('#content_wrapper').css('height','50vh');
            
        });

    });

    //when click signup button 
    $('#signup_button').click(function(){
        
        
        //checking values are valid
        if(!isUserName($('#signup_username').val())){
            $('#signup_username').css('border-bottom', '2px solid red');
            $(signup_text_username).css('visibility', 'visible');
        }
        if(!isEmail($('#signup_email').val())){
            $('#signup_email').css('border-bottom', '2px solid red');
            $(signup_text_email).css('visibility', 'visible');
        }
        if(!isPW($('#signup_pw').val())){
            $('#signup_pw').css('border-bottom', '2px solid red');
            $(signup_text_pw).css('visibility', 'visible');
        }
        if(!isCPW($('#signup_pw').val(), $('#signup_cpw').val())){
            $('#signup_cpw').css('border-bottom', '2px solid red');
            $(signup_text_cpw).css('visibility', 'visible');
        }

    });

    //handle input
    $('#signup_username').on('input', function(){

        var inputValue = $(this).val();
        $('#signup_text_username').text("* Your username should be 5 to 20 characters in English letters and numbers.");
        if (isUserName(inputValue)) {
            $(this).css('border-bottom', '2px solid green');
            $(signup_text_username).css('visibility', 'hidden');
        } else {
            $(this).css('border-bottom', '2px solid red');
            $(signup_text_username).css('visibility', 'visible');
        }
    });

    $('#signup_email').on('input', function(){

        var inputValue = $(this).val();
        $('#signup_text_email').text("* Enter your valid email.");
        if (isEmail(inputValue)) {
            $(this).css('border-bottom', '2px solid green');
            $(signup_text_email).css('visibility', 'hidden');
        } else {
            $(this).css('border-bottom', '2px solid red');
            $(signup_text_email).css('visibility', 'visible');
        }

    });


    $('#signup_pw').on('input', function(){

        var inputValue = $(this).val();

        if (isPW(inputValue)) {
            $(this).css('border-bottom', '2px solid green');
            $(signup_text_pw).css('visibility', 'hidden');
        } else {
            $(this).css('border-bottom', '2px solid red');
            $(signup_text_pw).css('visibility', 'visible');
        }

    });

    $('#signup_cpw').on('input', function(){

        var inputValue = $(this).val();
        var pw = $('#signup_pw').val();
        
        if (isCPW(inputValue,pw)) {
            $(this).css('border-bottom', '2px solid green');
            $(signup_text_cpw).css('visibility', 'hidden');
        } else {
            $(this).css('border-bottom', '2px solid red');
            $(signup_text_cpw).css('visibility', 'visible');
        }

    });

    $('#login_username').on('input', function(){

        var inputValue = $(this).val();
        $('#login_text_username').text("");
        if (inputValue.trim() != '') {
            $(this).css('border-bottom', '2px solid green');
            $(login_text_username).css('visibility', 'hidden');
        } else {
            $(this).css('border-bottom', '2px solid red');
            $(login_text_username).css('visibility', 'visible');
        }

    });

    $('#login_pw').on('input', function(){

        var inputValue = $(this).val();
        $('#login_text_pw').text("");
        if (inputValue.trim() != '') {
            $(this).css('border-bottom', '2px solid green');
            $(login_text_pw).css('visibility', 'hidden');
        } else {
            $(this).css('border-bottom', '2px solid red');
            $(login_text_pw).css('visibility', 'visible');
        }

    });

});



//username constraints
function isUserName(value) {
    if(value.trim() == ''){
        return false
    }
    var usernamePattern = /^[a-zA-Z0-9]{5,20}$/;
    var isValidUsername = usernamePattern.test(value);
    if(isValidUsername != true){
        return false
    }
    return true
}

//email constraints
function isEmail(value) {
    if(value.trim() == ''){
        return false
    }
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    var isValidEmail = emailPattern.test(value);
    if(isValidEmail != true){
        return false
    }
    return true
}

//password constraints
function isPW(value) {
    if(value.trim() == ''){
        return false
    }
    //regex
    var pwPattern = /^[a-zA-Z0-9~!@#$%^&*()_+{}:<>"?:;₩\[\].=-]{8,20}$/;
    var isValidPW = pwPattern.test(value) 
    
    if(isValidPW != true){
        return false
    }
    return true
}

//confirm password constraints
function isCPW(value,pwvalue) {
    if(value.trim() == ''){
        return false
    }
    if(value != pwvalue){
        return false
    }
    return true
}