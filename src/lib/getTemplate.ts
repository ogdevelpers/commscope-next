// Email template function for CommScope Technology Forum 2025
export const getConfirmationEmailTemplate = (name: string) => {
  return `
  <!DOCTYPE html
     PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml">
 
 <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>CommScope Technology Forum 2025</title>
     <style type="text/css">
         body {
             margin: 0;
             padding: 0;
             background-color: #f4f4f4;
             font-family: Arial, Helvetica, sans-serif;
             color: #333333;
         }
 
         table {
             border-collapse: collapse;
         }
 
         td {
             padding: 0;
             margin: 0;
         }
 
         img {
             border: 0;
             line-height: 100%;
             outline: none;
             text-decoration: none;
         }
 
         .calendar-button {
             background-color: #0066CC;
             color: white;
             padding: 10px 15px;
             text-decoration: none;
             border-radius: 4px;
             font-family: Arial;
             font-size: 14px;
             display: block;
             font-weight: bold;
             text-align: center;
             width: 100%;
             box-sizing: border-box;
             background-image: linear-gradient(273.36deg, #282AA7 -13.67%, #0071BA 3.49%, #02ADF0 21.2%, #00A9B4 41.91%, #00A562 59.34%, #2BB056 76.51%, #C9DA2C 94.22%, #FDC111 111.29%);
             text-decoration: none;
         }
 
         .left-content {
             padding-right: 20px;
             width: 75%;
         }
 
         .contact-box {
             margin-top: 20px;
             padding: 15px;
             background-color: #f9f9f9;
             border-radius: 4px;
         }
 
         .right-column {
             width: 25%;
             vertical-align: top;
             padding-left: 20px;
         }
 
         .vertical-line-cell {
             width: 2px;
             vertical-align: top;
             background-color: #cccccc;
         }
 
         .content-wrapper {
             padding: 40px 40px 20px;
             background-color: white;
         }
 
         /* Outlook-specific fixes */
         .ExternalClass,
         .ExternalClass p,
         .ExternalClass span,
         .ExternalClass font,
         .ExternalClass td,
         .ExternalClass div {
             line-height: 100%;
         }
 
         .button-container {
             width: 100%;
         }
     </style>
     </head>
 
 <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
     <center>
         <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4">
             <tr>
                 <td align="center" style="padding: 0;">
                     <table class="container" width="800" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff"
                         style="max-width: 800px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                         <tr>
                             <td align="center">
                                 <img src="https://commscope.msdplus.com/images/Hero_website.png"
                                     alt="CommScope Technology Forum 2025" width="800"
                                     style="display:block; width:100%; max-width:800px; height:auto; border:0; outline:none; text-decoration:none;">
                             </td>
                         </tr>
 
                         <tr>
                             <td class="content-wrapper">
                                 <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                     <tr>
                                         <td valign="top" class="left-content">
                                             <p
                                                 style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-size: 16.693px; line-height: 1.5;">
                                                 Dear ${name},</p>
                                             <p
                                                 style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 29px; margin-top: 0;">
                                                 Thank you for registering for the <a href="https://commscope.msdplus.com/CommScope-Technology-Forum-2025/">CommScope Technology Forum 2025</a>. Your registration is now confirmed.</p>
                                             <p
                                                 style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-size: 16.693px; line-height: 1.5; font-style: italic;">
                                                 <i><strong>Note:</strong>If you wish to cancel your booking, please inform us immediately at <a href="mailto:commscope@msdplus.com">commscope@msdplus.com</a>.</i></p>
                                             <p
                                                 style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-size: 16.693px; line-height: 1.5;">
                                                 The event will take place at <a href="https://msdplus.com/hotel">The Peninsula, Bangkok</a>, from <strong>29th September to 2nd October 2025.</strong></p>
                                             <p
                                                 style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-size: 16.693px; line-height: 1.5;">
                                                 We look forward to welcoming you to <strong>Bangkok, Thailand</strong></p>
 
                                              <p style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-size: 16.693px; line-height: 1.5;">Best Regards,</p>
                                              <p style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-size: 16.693px; line-height: 1.5;"><strong>The CommScope Team</strong></p>
                                              <p style="color: #333333; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.5;">For more information, please contact:  <a href="mailto:commscope@msdplus.com">commscope@msdplus.com</a></p>
                                              <a href="https://commscope.msdplus.com/invite/Save_the_Date-CommScope_Technology_Forum_2025.ics" class="calendar-button">ADD TO CALENDAR</a>
                                         </td>
                                     </tr>
                                 </table>
                             </td>
                         </tr>
                     </table>
                 </td>
             </tr>
         </table>
     </center>
 </body>
 
 </html>
  `;
};