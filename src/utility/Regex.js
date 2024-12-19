export default class Regex {
    static reg_name = /^[a-zA-Z]{2,}([ ][a-zA-Z]{2,})*$/;
    static reg_title = /^[a-zA-Z0-9é&çàè\$\€\_\-\+\-\/\\\|\,\;\:\!\?\.\*]{1,}([ ][a-zA-Z0-9é&çàè\$\€\_\-\+\-\/\\\|\,\;\:\!\?\.\*]{1,})*$/;
    static reg_handle = /^[a-zA-Z]+[a-zA-Z0-9._-]*[a-zA-Z0-9]+$/;
    static reg_email =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]+))$/;
    static reg_password = /^[a-zA-Z0-9!#@éè&çà%-\.\&\ù\_\$\^\*]{8,64}$/;
    static reg_phone = /^[0]{1,1}[5-7]{1,1}[0-9]{8,8}$/;
    static reg_number = /\d/;
    static reg_message = /^[a-zA-Z0-9é&çàè\$\€\_\-\+\-\/\\\|\,\;\:\!\?\.\* ]+$/;
    static reg_url = /^(http|https):\/\/[^ "]+$/;
    static reg_yt = /^https:\/\/(www\.)?youtube\.com\/watch\?v=[^ "]+$/;
    static validate(value, pattern) {
      if (pattern.test(value)) return true;
      else {
        if (value === "") return false;
        else return false;
      }
    }
  }
