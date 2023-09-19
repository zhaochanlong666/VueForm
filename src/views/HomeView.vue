<template>
  <div class="box">
    <form>
      <h2> Form 表单 </h2>
      <label for="username">用户名:</label>
      <input type="text" id="username" v-model="name" placeholder="请输入用户名" required><br><br>

      <label for="loginUser">用户ID:</label>
      <input type="text" id="loginUser" v-model="userid" placeholder="请输入登录用户的userid" required><br><br>

      <label for="imagePath">头像:</label>
      <img :src="imageUrl" v-if="imageUrl" alt="">
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <br><br>
      <label for="gender">性别:</label>
      <select id="gender" v-model="sex">
        <option value="0">男性</option>
        <option value="1">女性</option>
      </select><br><br>

      <label for="phoneNumber">手机号:</label>
      <input type="tel" id="phoneNumber" v-model="iphone" placeholder="请输入你的手机号" pattern="[1-9]\d{1,11}" required><br><br>

      <button type="submit" @click.prevent="submitForm">提交</button>
    </form>
  </div>
</template>

<script>
import { getList, getForm } from "../api/http"
import md5 from 'js-md5'
import axios from 'axios'
export default {
  data() {
    return {
      role: '123',
      strheader: 1111,
    /* ........................... */
      name: '',
      str: 'nbsp123ok',
      userid: "",
      sex: "",
      iphone: "12961888152",
      imageUrl: ""
    };
  },
  created() {
    this.api()
  },
  methods: {
    api() {
      let obj = {
        name: this.name,
        role: this.role,
        sign: md5(this.name + this.role + this.str + 1111)
      }
      getList(obj).then((res) => {
        console.log(res);
        /* console.log(obj.sign);//md5解密 */
      })
    },
    submitForm() {
      const data = {
        name: this.name,
        userid: this.userid,
        sex: this.sex,
        iphone: this.iphone
      }
      getForm(data).then((res) => {
        console.log(res);
      })
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        const formData = new FormData();
        formData.append('imgurl', base64Data);
        axios.post('https://www.zzgoodqc.cn/index.php/index/upload/uploadimg', formData)
          .then(res => {
            const imagePath = res.data.data.url;
            // 拼接接口域名或IP
            this.imageUrl = `https://www.zzgoodqc.cn/${imagePath}`;
            console.log(res.data);
          })
          .catch(error => {
            console.error(error);
            // 根据需要处理错误
          });
      }
      reader.readAsDataURL(file);
    },
  },
  computed: {
    fullImageUrl() {
      return this.imageUrl;
    }
  },
}

</script>
<style>  .box {
    margin: 150px auto;
  }

  h2 {
    text-align: center;
  }

  form {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="text"],
  input[type="tel"],
  input[type="date"],
  select,
  textarea {
    width: 97%;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  #gender {
    width: 100%;
  }

  textarea {
    height: 100px;
  }

  button[type="submit"] {
    display: block;
    margin-top: 10px;
    padding: 7px 10px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #45a049;
  }
  img{
    width: 80px;
    height: 50px;
    display: inline-block;
  }
</style>  