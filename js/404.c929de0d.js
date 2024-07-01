"use strict";(self["webpackChunkapartment_rent"]=self["webpackChunkapartment_rent"]||[]).push([[404],{3508:function(e,t,a){a.r(t),a.d(t,{default:function(){return P}});var r=a(4108);const s={class:"my-profile-page"};function l(e,t,a,l,n,o){const u=(0,r.E1)("EditProfile"),i=(0,r.E1)("SectionWithHeaderSpacer");return(0,r.Wz)(),(0,r.An)("main",s,[(0,r.K2)(i,null,{default:(0,r.Ql)((()=>[(0,r.K2)(u)])),_:1})])}var n=a(940),o=a(7764),u=a(9096);const i={class:"profile__part"},m={class:"profile__part"},d={class:"profile__part-address"},h={class:"profile__part"},p={class:"profile__part"},c={class:"profile__part-photo"},f={class:"btn-wrapper"};function g(e,t,a,s,l,n){const g=(0,r.E1)("MainTitle"),w=(0,r.E1)("RegularText"),D=(0,r.E1)("CustomInput"),_=(0,r.E1)("CustomTextArea"),U=(0,r.E1)("FormInputFile"),b=(0,r.E1)("ButtonVue"),V=(0,r.E1)("AppContainer");return(0,r.Wz)(),(0,r.Az)(V,{class:"profile"},{default:(0,r.Ql)((()=>[(0,r.K2)(g,{class:"profile__title"},{default:(0,r.Ql)((()=>[(0,r.mY)("Відредагуйте свої данні у профілі")])),_:1}),(0,r.QD)("form",{class:"profile__form",onSubmit:t[5]||(t[5]=(0,o.Y7)(((...e)=>n.handleSubmit&&n.handleSubmit(...e)),["prevent"]))},[(0,r.QD)("div",i,[(0,r.K2)(w,{tag:"p",alignment:"left"},{default:(0,r.Ql)((()=>[(0,r.mY)("Ваш нікнейм")])),_:1}),(0,r.K2)(D,{ref:"username",modelValue:l.formData.username,"onUpdate:modelValue":t[0]||(t[0]=e=>l.formData.username=e),placeholder:l.formData.username,autocomplete:"title",name:"username",rules:n.titleRules,class:"custom-input",width:"300px"},null,8,["modelValue","placeholder","rules"])]),(0,r.QD)("div",m,[(0,r.K2)(w,{tag:"p",alignment:"left"},{default:(0,r.Ql)((()=>[(0,r.mY)("Вкажіть контактну інформацію")])),_:1}),(0,r.QD)("div",d,[(0,r.K2)(D,{ref:"ownerNameInput",modelValue:l.formData.owner.name,"onUpdate:modelValue":t[1]||(t[1]=e=>l.formData.owner.name=e),placeholder:n.nameOfUser,autocomplete:"ownerName",name:"ownerName",rules:n.ownerNameRules,class:"custom-input",width:"300px"},null,8,["modelValue","placeholder","rules"]),(0,r.K2)(D,{ref:"ownerPhoneInput",modelValue:l.formData.owner.phone,"onUpdate:modelValue":t[2]||(t[2]=e=>l.formData.owner.phone=e),placeholder:n.phone,autocomplete:"ownerPhone",name:"ownerPhone",rules:n.phoneRules,class:"custom-input",width:"300px"},null,8,["modelValue","placeholder","rules"]),(0,r.K2)(D,{ref:"ownerEmailInput",modelValue:l.formData.owner.email,"onUpdate:modelValue":t[3]||(t[3]=e=>l.formData.owner.email=e),placeholder:l.formData.owner.email,autocomplete:"ownerEmail",name:"ownerEmail",rules:n.emailRules,class:"custom-input",width:"300px"},null,8,["modelValue","placeholder","rules"])])]),(0,r.QD)("div",h,[(0,r.K2)(w,{tag:"p",alignment:"left"},{default:(0,r.Ql)((()=>[(0,r.mY)('Додайте інформацію "Про себе"')])),_:1}),(0,r.K2)(_,{ref:"nameInput",modelValue:l.formData.aboutUser,"onUpdate:modelValue":t[4]||(t[4]=e=>l.formData.aboutUser=e),placeholder:n.aboutUser,autocomplete:"description",name:"description",rules:n.descrRules,class:"custom-input",width:"100%"},null,8,["modelValue","placeholder","rules"])]),(0,r.QD)("div",p,[(0,r.K2)(w,{tag:"p",alignment:"left"},{default:(0,r.Ql)((()=>[(0,r.mY)("Оновіть аватар")])),_:1}),(0,r.QD)("div",c,[l.mainImageUrl?((0,r.Wz)(),(0,r.An)("div",{key:0,class:"uploaded-image",style:(0,u.MN)({backgroundImage:"url("+l.mainImageUrl+")"})},null,4)):(0,r.g1)("",!0),(0,r.K2)(U,{name:"mainPhoto",accept:"image/png, image/jpeg",multiple:!1,single:!0,label:"Завантажити фотографію аватара",onChange:n.handleMainPhotoChange},null,8,["onChange"])])]),(0,r.QD)("div",f,[(0,r.K2)(b,{class:"btn-dark",type:"submit",label:"Оновити",height:"49px"})])],32)])),_:1})}var w=a(3408),D=a(6526),_=a(4916),U=a(3656),b=a(1176),V=a(576),v=a(1128),R=a(8396),I=a(3056),y=a(3812),E={name:"EditProfile",components:{AppContainer:w.c,MainTitle:D.c,RegularText:_.c,CustomInput:U.c,CustomTextArea:b.c,ButtonVue:V.c,FormInputFile:v.c},data(){return{mainImageUrl:"",formData:{username:y["default"].state.auth.user.username,aboutUser:y["default"].state.auth.user.aboutUser||"",owner:{email:y["default"].state.auth.user.email,name:y["default"].state.auth.user.name||"",phone:y["default"].state.auth.user.phone||""}}}},computed:{phone(){return this.$store.state.auth.user.phone?this.$store.state.auth.user.phone:"телефон"},nameOfUser(){return this.$store.state.auth.user.name?this.$store.state.auth.user.name:"ім'я"},aboutUser(){return this.$store.state.auth.user.aboutUser?this.$store.state.auth.user.aboutUser:"Про себе"},rules(){return{isRequired:R.UD,descrLimit:R.U3,titleLimit:R.Mw,phoneValidation:R.kL,emailValidation:R.e9,minTextLimit:R.e4}},descrRules(){return[this.rules.isRequired,this.rules.descrLimit(2e3)]},titleRules(){return[this.rules.isRequired,this.rules.titleLimit(200)]},ownerNameRules(){return[this.rules.isRequired,this.rules.minTextLimit(2)]},emailRules(){return[this.rules.isRequired,this.rules.emailValidation]},phoneRules(){return[this.rules.isRequired,this.rules.phoneValidation]}},methods:{handleMainPhotoChange(e){e&&(0,I.i)(e,200,200,(e=>{this.mainImageUrl=e}))},async handleSubmit(){const e=Object.values(this.$refs).every((e=>e.isValid));if(e){const e={username:this.formData.username,userAvatar:this.mainImageUrl,email:this.formData.owner.email,phone:this.formData.owner.phone,name:this.formData.owner.name,aboutUser:this.formData.aboutUser};try{this.$store.dispatch("technicial/startLoading"),await this.$store.dispatch("auth/editUserData",e),this.resetForm()}catch(t){this.$notify({type:"error",title:"Помилка",text:t.message})}finally{this.$store.dispatch("technicial/stopLoading")}}},resetForm(){this.mainImageUrl="",this.formData={username:y["default"].state.auth.user.username,aboutUser:y["default"].state.auth.user.aboutUser||"",owner:{email:y["default"].state.auth.user.email,name:y["default"].state.auth.user.name||"",phone:y["default"].state.auth.user.phone||""}}}}},Q=a(4100);const K=(0,Q.c)(E,[["render",g],["__scopeId","data-v-1433a3e8"]]);var x=K,$={name:"MyProfilePage",components:{SectionWithHeaderSpacer:n.c,EditProfile:x},data(){return{loading:!1}},async created(){try{await this.$store.dispatch("orders/getOrdersData"),this.loading=!1}catch(e){this.loading=!1,this.$notify({type:"error",title:"Відбулась помилка",text:e.message})}}};const C=(0,Q.c)($,[["render",l],["__scopeId","data-v-90777cb2"]]);var P=C}}]);
//# sourceMappingURL=404.c929de0d.js.map