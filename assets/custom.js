/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

document.addEventListener('variant:changed', function(event) {
  var variant = event.detail.variant;
  var myFlickity = $("[data-flickity]");
  if(variant.featured_media){// If selected media has a featured image
   	var variant_image_id = variant.featured_media.id;
    // Initialize all Elements which we will need
    var new_gallery_element = window.gallery_elements[variant_image_id].gallery;
    var new_desktop_element = window.gallery_elements[variant_image_id].desktop;
    var new_mobile_element = window.gallery_elements[variant_image_id].mobile;
     //Check if currently a Variant Image is shown with 'variant_image_gallery/desktop/mobile'
    if (document.getElementById("variant_image_desktop")){
     var current_desktop = document.getElementById("variant_image_desktop");
     var current_gallery = document.getElementById("variant_image_gallery");
     var current_mobile = document.getElementById("variant_image_mobile");
     current_desktop.classList.remove("is-selected");

              // Remove 'select' class from elements with class name except for the one with the ID
        var slideshowNavImages = document.querySelectorAll(".Product__SlideshowNavImage.AspectRatio.Nav_Items_Slideshow_Desktop");
        for (var i = 0; i < slideshowNavImages.length; i++) {
          if (slideshowNavImages[i].id !== "variant_image_desktop") {
            slideshowNavImages[i].classList.remove("selected");
          }
        }
        if (current_desktop) {
          current_desktop.classList.add("selected");
        }
      
      // Replace current Desktop Thumbnail with new Variants Thumbnail
      current_desktop.replaceWith(new_desktop_element);
      current_gallery.replaceWith(new_gallery_element);
      current_mobile.replaceWith(new_mobile_element);
      myFlickity.flickity("reloadCells");
      myFlickity.flickity("selectCell", new_gallery_element);
    }else{// If there was no Variant image initialised, add new images to DOM
      // Get the Desktop NavBar
      var desktop_wrapper = document.getElementsByClassName("Nav_Items_Slideshow_Desktop")[0].parentNode;
      var gallery_wrapper = document.getElementsByClassName("Product__SlideItem--image")[0].parentNode;
      var mobile_wrapper = document.getElementsByClassName("carousell-cell-mobile")[0].parentNode;
      // add new variant image to the bottom of the navbar
      desktop_wrapper.appendChild(new_desktop_element);
      // add new variant image to slick slider (nav_mobile and gallery)
      gallery_wrapper.appendChild(new_gallery_element);
      mobile_wrapper.appendChild(new_mobile_element);
      myFlickity.flickity("reloadCells");
      myFlickity.flickity("select",new_desktop_element.dataset.media_position);
      }
  }else{// if variant has no featured image
    //Check if currently a Variant Image is shown with 'variant_image_gallery/desktop/mobile' if yes, delete it
    if (document.getElementById("variant_image_desktop")){
      document.getElementById("variant_image_desktop").remove();
      document.getElementById("variant_image_gallery").remove();
      document.getElementById("variant_image_mobile").remove();
      myFlickity.flickity("reloadCells");
      myFlickity.flickity("select",0);
    }

  }
});



/*
 document.addEventListener('variant:changed', function(event) {
   var variant = event.detail.variant;
   //get the placeholder image as nav thumbnail
    var placeholder_img = document.querySelectorAll(`[data-ersetzt_varianten_bild]`)[0];
   var placeholder_img_mobile = document.querySelectorAll(`[data-ersetzt_varianten_bild_mobile]`)[0];
   //if no variant image available, place the original placeholder image to its position
   var placeholder_img_original = document.querySelectorAll(`[data-original_placeholder]`)[0];
   var placeholder_img_original_mobile = document.querySelectorAll(`[data-original_placeholder_mobile]`)[0];

   if (variant.featured_media != null){
     // Get the Nav Thumbnail for this Variant
    var new_img = document.querySelectorAll(`[href='#Media` + variant.featured_media.id + `']`)[0];
     var new_img_mobile = document.getElementById(`NavMedia`+ variant.featured_media.id);
     replace_variant_image(new_img, placeholder_img,false);
     replace_variant_image(new_img_mobile, placeholder_img_mobile,true)
   }else{
     if(placeholder_img.dataset.original_placeholder == undefined ){
     replace_variant_image(placeholder_img_original, placeholder_img, false);
     }
     if(placeholder_img_mobile.dataset.original_placeholder == undefined ){
     replace_variant_image(placeholder_img_original_mobile, placeholder_img_mobile, true);
     }

     Flickity.data(document.querySelectorAll("[data-flickity-config]")[0]).selectCell(0);
   }


 });


function replace_variant_image(new_img, placeholder_img, mobile){

    // Get placeholders widtha nd height
    var height = placeholder_img.offsetHeight;
    var width = placeholder_img.offsetWidth;



  if(mobile){
    // remove the placeholder identifier
    placeholder_img.removeAttribute('data-ersetzt_varianten_bild_mobile');
    //set Attribute for next Variant Change, because this image should be replaced as next
    new_img.setAttribute('data-ersetzt_varianten_bild_mobile','');
    var placeholder_style = placeholder_img.attributes.style.textContent;
    var new_img_style = new_img.attributes.style.textContent;
    placeholder_img.setAttribute("style", new_img_style + "display:none;")
    new_img.setAttribute("style", placeholder_style + "display:block;");

  }else{
    // Set it to visible, because all Variant_Images will be hidden first
    new_img.style.display = "block";
    // remove the placeholder identifier
    placeholder_img.removeAttribute('data-ersetzt_varianten_bild');
    //set Attribute for next Variant Change, because this image should be replaced as next
    new_img.setAttribute('data-ersetzt_varianten_bild','');
    //hide it
   placeholder_img.style.display = 'none';
  }

    new_img.style.height = height+"px";
    new_img.style.width = width+"px";

  	placeholder_img.parentNode.insertBefore(new_img, placeholder_img);
}

*/

/* SAVE THE URL, FROM WHICH THE CHECKOUT WAS INIT*/
function checkout_init_page(){
  var current_url = new URL(window.location.href);
  current_url.searchParams.delete("opendrawer");
  current_url.searchParams.set("opendrawer","true");
  localStorage.setItem('page_before_checkout', current_url.href);
}

const urlParams = new URLSearchParams(window.location.search);
if(urlParams.get("opendrawer") != null){
  document.querySelector("[data-action=open-drawer][data-drawer-id=sidebar-cart]").click()
}



