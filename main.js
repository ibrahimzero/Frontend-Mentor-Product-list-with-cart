let mainContainerCards=document.querySelector('.main-container .cardes-container');
let rightContainer=document.querySelectorAll('.right-container');
let orderCountSpan=document.querySelector('.right-container h3 span');
 let orderCount = 0;
 let defultOrder=document.querySelector('.right-container .defult ');
 let totalItemsprice;
 let totalItemspricediv=document.querySelector('.order-submit .total-price :last-child');
 let defaltStyle=document.querySelector('.right-container .defult .defalt-style ');
 let submitContainer=document.querySelector('.submit-container');
 let submitBtn=document.querySelector('.submit');
 let popupContainer=document.createElement('div');
 popupContainer.className='popup';
 let popup=document.createElement('div');
 popup.className='popup-card'
 popupContainer.appendChild(popup)
 document.body.appendChild(popupContainer);
 let popupIcon=document.createElement('img')
 popupIcon.src="assets/images/icon-order-confirmed.svg";
 popupIcon.className='popup-icon'
 popup.appendChild(popupIcon)
 
 let popupH1=document.createElement('h1');
 popupH1.innerHTML='Order Confirmed'
 popup.appendChild(popupH1)
 let popupP=document.createElement('p');
 popupP.className='popup-p'
 popupP.innerHTML='We hope your enjoy your food!'
 popup.appendChild(popupP);

function getData(){
    fetch('data.json')
    .then((response) =>{ 
        let myData= response.json();
        return myData;
    })
    .then((json) =>{
        for (let i = 0; i < json.length; i++) {
            //creat elments of card
            let imgContainer=document.createElement('div');
            imgContainer.className='img-container'
           let imag= document.createElement('img');
           imag.className="img-card"
           if (window.innerWidth > 650) {
            // desktop img size
            imag.src=json[i].image['desktop'];
          } else {
            // mobile img size
            imag.src = json[i].image.mobile;
          }
           
           let btn =document.createElement('div');
           btn.innerHTML='<img src="assets/images/icon-add-to-cart.svg" alt="">Add to Cart';
           btn.className="btn";
           btn.dataset.name=json[i].name;
           btn.dataset.image=json[i].image['desktop'];
           btn.dataset.category=json[i].category;
           btn.dataset.price=json[i].price;
           let counterCount=0;
           let itemSpan=document.createElement('span');
           let popCount=document.createElement('span')
           itemSpan.className='order-count'
           let itemPrice=btn.dataset.price;
           let popupItem= document.createElement('div');
            popupItem.className='popup-item-container';
           let pricespan=document.createElement('span');
           let popupPrice=document.createElement('span');
           popupPrice.innerHTML=`@ $${(itemPrice*1).toFixed(2)}`
           pricespan.innerHTML=`@ $${(itemPrice*1).toFixed(2)}`
           let totalItempriceSpan=document.createElement('span');
           let popupTotalItemP=document.createElement('div');
           popupTotalItemP.className='total-item-price'
           let totalItemprice=0
           totalItempriceSpan.className='total-price-span';
           let xBtn=document.createElement('img');
           xBtn.src="/assets/images/icon-remove-item.svg";
           popupItem.className='popup-item-container';
           
           let popupImg=document.createElement('img')
           popupImg.src=json[i].image.thumbnail;
           popupTotalItemP.className='total-item-price'
           let popupText=document.createElement('div');
            popupText.className='item-text'
           //button-card on click
           removeDefult()
           if(btn.classList.contains('active')){
            continue;
           }else
           btn.onclick=function(){
            btn.innerHTML="";
            let increas= document.createElement("div");
            increas.style.backgroundImage='url("/assets/images/icon-increment-quantity.svg")';
            increas.className='increas'
            let counter=document.createElement('div');
            counter.className='counter';
            let decreas= document.createElement("div");
            decreas.style.backgroundImage='url("/assets/images/icon-decrement-quantity.svg")';
            decreas.className='decreas';
            btn.appendChild(increas);
            btn.appendChild(counter);
            btn.appendChild(decreas)
            let yorCardItem=document.createElement("div");
            let popupText=document.createElement('div');
            popupText.className='item-text'
            if(!btn.classList.contains('active')){
                counterCount++
                orderCount++
                imag.style.border='2px solid #C73A0F'
                removeDefult()
            } 
            btn.classList.add('active')
            counter.innerHTML=counterCount
            orderCountSpan.innerHTML=orderCount
            itemSpan.innerHTML=`${counterCount}x`;
            popCount.innerHTML=`${counterCount}x`;
                if(!yorCardItem.classList.contains('selected')&&counterCount===1 ){
                    let itemNamePop=document.createElement('h4');
                    itemName=document.createElement('h4')
                    itemName.innerHTML=btn.dataset.name;
                    itemNamePop.innerHTML=btn.dataset.name;
                    
                    popupItem.appendChild(popupImg)
                            popupText.appendChild(itemNamePop);
                            popupText.appendChild(popCount)
                            popupText.appendChild(popupPrice)
                            yorCardItem.appendChild(itemName)
                            defultOrder.appendChild(yorCardItem);
                            yorCardItem.appendChild(itemSpan)
                            yorCardItem.className='selected';
                            popupText.classList.add('selected')
                            yorCardItem.appendChild(pricespan);
                            yorCardItem.appendChild(totalItempriceSpan);
                            popupItem.appendChild(popupTotalItemP)
                            popupItem.appendChild(popupText)
                            popup.appendChild(popupItem)
                            yorCardItem.appendChild(xBtn)
                            //popup item value
                            xBtn.onclick=function(){
                                yorCardItem.remove();
                                orderCount=orderCount-counterCount
                                orderCountSpan.innerHTML=orderCount
                                counterCount=0;
                               totalItemsprice= +totalItemsprice-totalItemprice
                               totalItemspricediv.innerHTML=totalItemsprice;
                               btn.innerHTML='<img src="assets/images/icon-add-to-cart.svg" alt="">Add to Cart';
                               btn.classList.remove('active')
                               imag.style.border='none';
                               removeDefult()
                               totalItemspricediv.innerHTML=`$<span>${(totalItemsprice*1).toFixed(2)}</span>`
                            }                            
                            totalItemprice=(counterCount*itemPrice).toFixed(2);
                            totalItempriceSpan.innerHTML=`$<span>${totalItemprice}</span>`;
                            popupTotalItemP.innerHTML=`$<span>${totalItemprice}</span>`
                }

            increas.addEventListener('click',function(){
                counterCount++;
                removeDefult()
                imag.style.border='2px solid #C73A0F'
                orderCount++;
                totalItemprice=(counterCount*itemPrice).toFixed(2);
                totalItempriceSpan.innerHTML=`$<span>${totalItemprice}</span>`;
                popupTotalItemP.innerHTML=`$<span>${totalItemprice}</span>`
            })
            decreas.addEventListener('click',function(){
               
                if(counterCount<=0){
                    btn.innerHTML='<img src="assets/images/icon-add-to-cart.svg" alt="">Add to Cart';
                    btn.classList.remove('active')
                    imgContainer.style.border='none';
                
                    
                }else{
                    orderCount--
                    orderCountSpan.innerHTML=orderCount
                     counterCount--;
                counter.innerHTML=counterCount
                }
                
                if(document.querySelector('.selected .order-count').innerHTML){
                    yorCardItem.remove()
                    
                    
                }
                totalItemprice=totalItemprice=(counterCount*itemPrice).toFixed(2);;
                totalItempriceSpan.innerHTML=`$<span>${totalItemprice}</span>`;
                removeDefult()
                popupTotalItemP.innerHTML=`$<span>${totalItemprice}</span>`
                
            },0)
            btn.onmouseleave=function(){
                if(counterCount==0){
                    btn.innerHTML='<img src="assets/images/icon-add-to-cart.svg" alt="">Add to Cart';
                    btn.classList.remove('active')
                    imag.style.border='none';

                }
                
            }
            let array=Array.from(document.querySelectorAll('.total-price-span :last-child'));
            let newArray=[];
            for(let i=0;i<array.length;i++){
                newArray.push(array[i].innerHTML)
            }

            totalItemsprice= newArray.reduce((e,i)=>{
                return Number(e)+ Number(i)},0);
                totalItemspricediv.innerHTML=`$<span>${(totalItemsprice*1).toFixed(2)}</span>`

                Array.from(document.querySelectorAll('.selected')).map(ele=>{ if(ele.children.length==1){
                    ele.remove()
                }
                }
                )

                submitBtn.onclick=function(){
                    popupContainer.classList.add('active-popup');
                    console.log((document.querySelectorAll(('.popup-item-container')[1]).firstChild)===(document.querySelectorAll(('.popup-item-container')[2]).firstChild))
                    console.log(document.querySelectorAll(('.popup-item-container')[1]));
                    let totalorder=document.createElement('div');
                    totalorder.className='pop-total-order'
                    totalorder.innerHTML=`Order Total <span>$${(totalItemsprice*1).toFixed(2)}</span>`;
                    popup.appendChild(totalorder)
                    let newOrderbtn=document.createElement('button');
                    newOrderbtn.className='submit'
                    newOrderbtn.innerHTML='Start New Order'
                    popup.appendChild(newOrderbtn)
                    newOrderbtn.onclick=function(){
                        window.location.reload()
                    }
                
                }
                
           }
           
           
           let category =document.createElement('div');
           category.innerHTML=json[i].category;
           category.className='category';
           let name = document.createElement('div');
           name.className='name';
           name.innerHTML=json[i].name;
           let price =document.createElement('div');
           price.innerHTML=`$${(json[i].price).toFixed(2)}`;
           price.classList='price';
           let cardContainer=document.createElement('div');
            cardContainer.className="card-container";
           //append childes
           imgContainer.appendChild(imag);
           imgContainer.appendChild(btn);
           cardContainer.appendChild(imgContainer);
           cardContainer.appendChild(category);
           cardContainer.appendChild(name);
           cardContainer.appendChild(price);
            mainContainerCards.appendChild(cardContainer);
       }
    } );

}
getData();
function removeDefult(){
    if(orderCount==0){
    defaltStyle.classList.remove('remove')
    submitContainer.classList.add('remove')
    document.querySelector('.total-price').classList.add('remove')
    
}else{
    defaltStyle.classList.add('remove')
    submitContainer.classList.remove('remove')
    document.querySelector('.total-price').classList.remove('remove')
    
}
}