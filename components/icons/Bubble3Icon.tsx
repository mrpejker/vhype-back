import React from 'react';

interface BubbleIconProps {
  className?: string;
  fill?: string;
}

const Bubble3Icon: React.FC<BubbleIconProps> = ({ className, fill }) => (
  <svg
    width="105"
    className={className}
    height="45"
    viewBox="0 0 105 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="105" height="36" rx="18" transform="matrix(-1 0 0 1 105 9)" fill={fill} />
    <path
      d="M28.1314 19.3636H30.5632V27.4773C30.5632 28.2273 30.3946 28.8788 30.0575 29.4318C29.7242 29.9848 29.2602 30.411 28.6655 30.7102C28.0708 31.0095 27.3795 31.1591 26.5916 31.1591C25.8909 31.1591 25.2545 31.036 24.6825 30.7898C24.1143 30.5398 23.6636 30.161 23.3303 29.6534C22.9969 29.142 22.8321 28.5 22.8359 27.7273H25.2848C25.2924 28.0341 25.3549 28.2973 25.4723 28.517C25.5935 28.733 25.7583 28.8996 25.9666 29.017C26.1787 29.1307 26.4287 29.1875 26.7166 29.1875C27.0196 29.1875 27.2753 29.1231 27.4837 28.9943C27.6958 28.8617 27.8568 28.6686 27.9666 28.4148C28.0765 28.161 28.1314 27.8485 28.1314 27.4773V19.3636ZM36.495 31.1705C35.6125 31.1705 34.8492 30.983 34.2053 30.608C33.5651 30.2292 33.0708 29.7027 32.7223 29.0284C32.3738 28.3504 32.1996 27.5644 32.1996 26.6705C32.1996 25.7689 32.3738 24.9811 32.7223 24.3068C33.0708 23.6288 33.5651 23.1023 34.2053 22.7273C34.8492 22.3485 35.6125 22.1591 36.495 22.1591C37.3776 22.1591 38.139 22.3485 38.7791 22.7273C39.4231 23.1023 39.9193 23.6288 40.2678 24.3068C40.6162 24.9811 40.7905 25.7689 40.7905 26.6705C40.7905 27.5644 40.6162 28.3504 40.2678 29.0284C39.9193 29.7027 39.4231 30.2292 38.7791 30.608C38.139 30.983 37.3776 31.1705 36.495 31.1705ZM36.5064 29.2955C36.9079 29.2955 37.2431 29.1818 37.5121 28.9545C37.781 28.7235 37.9837 28.4091 38.12 28.0114C38.2602 27.6136 38.3303 27.161 38.3303 26.6534C38.3303 26.1458 38.2602 25.6932 38.12 25.2955C37.9837 24.8977 37.781 24.5833 37.5121 24.3523C37.2431 24.1212 36.9079 24.0057 36.5064 24.0057C36.1011 24.0057 35.7602 24.1212 35.4837 24.3523C35.2109 24.5833 35.0045 24.8977 34.8643 25.2955C34.728 25.6932 34.6598 26.1458 34.6598 26.6534C34.6598 27.161 34.728 27.6136 34.8643 28.0114C35.0045 28.4091 35.2109 28.7235 35.4837 28.9545C35.7602 29.1818 36.1011 29.2955 36.5064 29.2955ZM42.3643 31V22.2727H44.7848V31H42.3643ZM43.5803 21.1477C43.2204 21.1477 42.9117 21.0284 42.6541 20.7898C42.4003 20.5473 42.2734 20.2576 42.2734 19.9205C42.2734 19.5871 42.4003 19.3011 42.6541 19.0625C42.9117 18.8201 43.2204 18.6989 43.5803 18.6989C43.9401 18.6989 44.2469 18.8201 44.5007 19.0625C44.7583 19.3011 44.8871 19.5871 44.8871 19.9205C44.8871 20.2576 44.7583 20.5473 44.5007 20.7898C44.2469 21.0284 43.9401 21.1477 43.5803 21.1477ZM49.1442 25.9545V31H46.7237V22.2727H49.0305V23.8125H49.1328C49.326 23.3049 49.6499 22.9034 50.1044 22.608C50.5589 22.3087 51.1101 22.1591 51.7578 22.1591C52.3639 22.1591 52.8923 22.2917 53.343 22.5568C53.7938 22.822 54.1442 23.2008 54.3942 23.6932C54.6442 24.1818 54.7692 24.7652 54.7692 25.4432V31H52.3487V25.875C52.3525 25.3409 52.2161 24.9242 51.9396 24.625C51.6631 24.322 51.2824 24.1705 50.7976 24.1705C50.4718 24.1705 50.1839 24.2405 49.9339 24.3807C49.6877 24.5208 49.4946 24.7254 49.3544 24.9943C49.218 25.2595 49.148 25.5795 49.1442 25.9545ZM65.9766 27.2841V22.2727H68.397V31H66.0732V29.4148H65.9822C65.7853 29.9261 65.4576 30.3371 64.9993 30.6477C64.5447 30.9583 63.9898 31.1136 63.3345 31.1136C62.7512 31.1136 62.2379 30.9811 61.7947 30.7159C61.3516 30.4508 61.005 30.0739 60.755 29.5852C60.5088 29.0966 60.3838 28.5114 60.38 27.8295V22.2727H62.8004V27.3977C62.8042 27.9129 62.9425 28.3201 63.2152 28.6193C63.4879 28.9186 63.8535 29.0682 64.3118 29.0682C64.6035 29.0682 64.8762 29.0019 65.13 28.8693C65.3838 28.733 65.5883 28.5322 65.7436 28.267C65.9027 28.0019 65.9804 27.6742 65.9766 27.2841ZM77.5945 24.7614L75.3786 24.8977C75.3407 24.7083 75.2592 24.5379 75.1342 24.3864C75.0092 24.2311 74.8445 24.108 74.6399 24.017C74.4392 23.9223 74.1986 23.875 73.9183 23.875C73.5433 23.875 73.227 23.9545 72.9695 24.1136C72.7119 24.2689 72.5831 24.4773 72.5831 24.7386C72.5831 24.947 72.6664 25.1231 72.8331 25.267C72.9998 25.411 73.2857 25.5265 73.6911 25.6136L75.2706 25.9318C76.1191 26.1061 76.7517 26.3864 77.1683 26.7727C77.585 27.1591 77.7933 27.6667 77.7933 28.2955C77.7933 28.8674 77.6248 29.3693 77.2876 29.8011C76.9543 30.233 76.496 30.5701 75.9126 30.8125C75.3331 31.0511 74.6645 31.1705 73.907 31.1705C72.7517 31.1705 71.8312 30.9299 71.1456 30.4489C70.4638 29.964 70.0642 29.3049 69.9467 28.4716L72.3274 28.3466C72.3994 28.6989 72.5736 28.9678 72.8501 29.1534C73.1267 29.3352 73.4808 29.4261 73.9126 29.4261C74.3369 29.4261 74.6778 29.3447 74.9354 29.1818C75.1967 29.0152 75.3293 28.8011 75.3331 28.5398C75.3293 28.3201 75.2365 28.1402 75.0547 28C74.8729 27.8561 74.5926 27.7462 74.2138 27.6705L72.7024 27.3693C71.8501 27.1989 71.2157 26.9034 70.799 26.483C70.3861 26.0625 70.1797 25.5265 70.1797 24.875C70.1797 24.3144 70.3312 23.8314 70.6342 23.4261C70.9411 23.0208 71.371 22.7083 71.924 22.4886C72.4808 22.2689 73.1323 22.1591 73.8786 22.1591C74.9808 22.1591 75.8482 22.392 76.4808 22.858C77.1172 23.3239 77.4884 23.9583 77.5945 24.7614ZM82.2095 19.3636L81.9879 27.5114H79.9084L79.6811 19.3636H82.2095ZM80.9482 31.1477C80.5732 31.1477 80.2512 31.0152 79.9822 30.75C79.7133 30.4811 79.5807 30.1591 79.5845 29.7841C79.5807 29.4129 79.7133 29.0947 79.9822 28.8295C80.2512 28.5644 80.5732 28.4318 80.9482 28.4318C81.308 28.4318 81.6243 28.5644 81.897 28.8295C82.1697 29.0947 82.308 29.4129 82.3118 29.7841C82.308 30.0341 82.2417 30.2633 82.1129 30.4716C81.9879 30.6761 81.8232 30.8409 81.6186 30.9659C81.4141 31.0871 81.1906 31.1477 80.9482 31.1477Z"
      fill="#3D3D3D"
    />
    <path d="M85.5 0L71 9.5L85.5 12.5V0Z" fill={fill} />
  </svg>
);

export default Bubble3Icon;