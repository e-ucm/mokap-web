/** FUNCTIONS 
-------------------------------------------- */
 function check_fadein_elements_visibility(){
    
        /* Check the location of each desired element */
        $('.fadeIn_on_scroll').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},700);
                    
            }
            
        }); 
 }

 function check_marketing_image_visibility(){
    
        /* Check the location of each desired element */
        $('.marketing_img').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                /*$(this).animate({top:150}, 0);*/
                $(this).animate({'opacity':'1'},{duration:1000, queue:true});
                $(this).animate({top:0},{duration:800, queue:false});    
            }
            
        }); 
    
 }
 
 function check_featurette_image_visibility(){
    
        /* Check the location of each desired element */
        $('.featurette_image').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                $(this).animate({'opacity':'1'},{duration:700, queue:true});
				$(this).animate({left:0},{duration:400, queue:false});    
            }
            
        }); 
    
 }

 function enter_animations(){
	check_fadein_elements_visibility();
	/*check_marketing_image_visibility();
	check_featurette_image_visibility();*/
	/* Check the location of each desired element */
	$('.animate_on_scroll').each( function(i){
		
		var bottom_of_object = $(this).position().top + $(this).outerHeight();
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		
		var top_of_object = $(this).offset().top;
	
		/* If the object is completely visible in the window, start animations */
		if( bottom_of_window > top_of_object){
		
			if ($(this).hasClass('delay')){
				$(this).delay(500);
			}
			var durationLong = 900;
			var durationShort = 700;
			if ($(this).hasClass('slow')){
				durationLong = 1000;
				durationShort = 1000;
			} else if ($(this).hasClass('fast')){
				durationLong = 500;
				durationShort = 400;
			}
		
			$(this).animate({'opacity':'1'},{duration:durationLong, queue:true});
			
			var screen_width = $(window).width();
			if (screen_width>768){
				if ($(this).hasClass('enter_from_left') || $(this).hasClass('enter_from_right')){
					$(this).animate({'left':0},{duration:durationShort, queue:false});    
				}
				
				if ($(this).hasClass('enter_from_above') || $(this).hasClass('enter_from_below')){
					$(this).animate({'top':0},{duration:durationShort, queue:false});    
				}
			}
		}
		
	}); 	
 }
 
 function keepcalm_dialog(type){
	if (type=='unpublished'){
		setup_keepcalm_dialog_unpublished();
	} else if (type=='community_offline'){
		setup_keepcalm_dialog_comm_offline();
	}
	$('#keepcalm_dialog').modal('toggle');
}

function setup_keepcalm_dialog_unpublished(){
	setup_keepcalm_dialog("We are still working on it, but <code>mokap</code> will be available for free download very soon on Google Play. Wait for us!","OK! I will wait!");
}

function setup_keepcalm_dialog_comm_offline(){
	setup_keepcalm_dialog("Sorry, but <code>mokap community</code> is not available right now. We are working to get it up and running as soon as possible.", "Pity. I'll try later");
}

function setup_keepcalm_dialog(msg,okbtn){
	$('#keepcalm_dialog_okbutton').html(okbtn);
	$('#keepcalm_dialog_msg').html(msg);
}

 /** JQUERY TO LAUNCH ON LOAD
-------------------------------------------- */
 
$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});

$(document).ready(function() {

	var screen_width = $(window).width();
	if (screen_width>768){
		$('[data-toggle=tooltip]').tooltip();
	}

	var screen_width = $(window).width();
	if (screen_width>768){
		enter_animations();
	}	

	$(window).scroll(enter_animations);
	$(document).click(function(){
		resetMailFeedback();
	});
});

function validateMailForm(form){
	
	/* Reset mail feedback popup*/
	resetMailFeedback();

	/* Check name */
	var contactname=form.name.value;
	var name_exp=/^[A-Za-z\s]+$/;
	if(contactname==''){
		form.name.focus();
		return "Name Field Should Not Be Empty!";
	} else if(!contactname.match(name_exp)){
		form.name.focus();	
		return "Invalid Name field!";
	}

	/* Check email*/
	var email=form.email.value;
	var email_exp=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if(email==''){
		form.email.focus();
		return "Please Enter Email-Id!";
	} else if(!email.match(email_exp)){
		form.email.focus();
		return "Invalid Email ID !";
	}

	/* Check message*/
	var message=form.message.value;
	if(message==''){
		form.message.focus();
		return "Query Field Should Not Be Empty!";
	}
	
	/* Check CAPTCHA */
	var captcha_code=form.captcha_code.value;
	if (captcha_code==''){
		form.captcha_code.focus();
		return "For security, you must enter the captcha code";	
	}

    return "";
}

function showMailFeedback(type){
	if (type=='fail'){
		$('#contact_mail_btn').popover({
			'trigger':'manual',
			'content':'Sorry for that. Perhaps you would like to try again later',
			'placement':'top',
			'title':'Oops! We could not send your message',
			'template':'<div class="popover popover-mail-fail" role="tooltip"><div class="arrow arrow-mail-fail"></div><h3 class="popover-title popover-title-mail-fail"></h3><div class="popover-content popover-content-mail-fail"></div></div>'	
		});		
	} else if (type=='ok'){
		$('#contact_mail_btn').popover({
			'trigger':'manual',
			'content':'We will get back to you as soon as possible',
			'title':'',
			'placement':'top',
			'title':'Message sent!',
			'template':'<div class="popover popover-mail-ok" role="tooltip"><div class="arrow arrow-mail-ok"></div><h3 class="popover-title popover-title-mail-ok"></h3><div class="popover-content popover-content-mail-ok"></div></div>'	
		});	
	} else {
		var content=type;
		if (type=='captcha'){
			type='The captcha entered does not match!';
		}
		$('#contact_mail_btn').popover({
			'trigger':'manual',
			'content':type,
			'placement':'top',
			'title':'Oops! Have a look, the form contains errors',
			'template':'<div class="popover popover-mail-invalid" role="tooltip"><div class="arrow arrow-mail-invalid"></div><h3 class="popover-title popover-title-mail-invalid"></h3><div class="popover-content popover-content-mail-invalid"></div></div>'			
		});	
	}
	$('#contact_mail_btn').popover('show');
}

function resetMailFeedback(){
	$('#contact_mail_btn').popover('destroy');
}

function resetCaptcha(){
	document.getElementById('captcha').src = '/email/securimage_show.php?' + Math.random(); 
	return false;
}

//callback handler for form submit
$("#ajaxform").submit(function(e)
{
    e.preventDefault(); //STOP default action
    var postData = $(this).serialize();
    var formURL = $(this).attr("action");
	var validationMsg = validateMailForm($(this)[0]);
	if (validationMsg==""){
		$.ajax(
			{
				url : formURL,
				type: "POST",
				data : postData,
				success:function(data, textStatus, jqXHR) 
				{
					if (data=="OK"){
						showMailFeedback('ok');
						resetCaptcha();
					} else if (data=="FAILURE"){
						showMailFeedback('fail');
						resetCaptcha();
					} else if (data=="CAPTCHA"){
						showMailFeedback('captcha');
					}
					console.log(data);
					console.log(textStatus);
					console.log(jqXHR);
					//data: return data from server
				},
				error: function(jqXHR, textStatus, errorThrown) 
				{
					/*$('#mail_error').animate({'opacity':'1'},800);*/
					showMailFeedback('fail');
					//if fails      
				}
			});
	} else {
		showMailFeedback(validationMsg);
	}
});


/*$("#ajaxform").submit();*/ //Submit  the FORM