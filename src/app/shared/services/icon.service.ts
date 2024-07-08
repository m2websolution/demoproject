import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  iconList = [
    {
      name: 'logo_name',
      filePath: 'assets/svg/logos/Logo_Back_Transparent.svg',
    },
    {
      name: 'hand_logo',
      filePath: 'assets/svg/logos/hand-logo.svg',
    },
    { name: 'company_setting' },
    { name: 'company_setting_selected', path: 'filled' },
    {
      name: 'customization_options',
    },
    {
      name: 'customization_options_selected',
      path: 'filled',
    },
    { name: 'general_setting' },
    { name: 'general_setting_selected', path: 'filled' },
    { name: 'great_user', path: 'filled' },
    { name: 'next_icon_blue', path: 'filled' },

    { name: 'get_review' },
    { name: 'get_review_selected', path: 'filled' },
    {
      name: 'help_documentation',
    },
    { name: 'onboarding_bg_img', path: 'filled' },

    {
      name: 'help_documentation_selected',
      path: 'filled',
    },
    { name: 'home' },
    { name: 'home_selected', path: 'filled' },
    { name: 'integrations' },
    { name: 'integrations_selected', path: 'filled' },
    { name: 'my_reviews' },
    { name: 'my_reviews_selected', path: 'filled' },
    { name: 'notification' },
    { name: 'notification_selected', path: 'filled' },
    { name: 'private_feedback' },
    { name: 'private_feedback_selected', path: 'filled' },
    { name: 'reports' },
    { name: 'reports_selected', path: 'filled' },
    { name: 'review_platforms' },
    { name: 'review_platforms_selected', path: 'filled' },
    { name: 'widgets' },
    { name: 'widgets_selected', path: 'filled' },
    { name: 'premium', path: 'filled' },
    { name: 'notifications' },
    { name: 'settings' },
    { name: 'email' },

    { name: 'upload', path: 'filled' },
    { name: 'add' },
    { name: 'download_icon' },
    { name: 'download_yellow' },

    { name: 'search' },
    { name: 'delete' },
    { name: 'invited_camera', path: 'filled' },
    { name: 'invited_search', path: 'filled' },
    { name: 'edit_icon_blue', path: 'filled' },

    { name: 'action_subtract', path: 'filled' },
    { name: 'action_close' },
    { name: 'action_info' },
    { name: 'action_message' },
    { name: 'action_tick' },
    { name: 'action_close_filled', path: 'filled' },
    { name: 'action_info_filled', path: 'filled' },
    { name: 'action_message_filled', path: 'filled' },
    { name: 'action_tick_filled', path: 'filled' },
    { name: 'close' },
    { name: 'eye_icon', path: 'filled' },
    { name: 'edit_icon', path: 'filled' },

    { name: 'check_filled', path: 'filled' },
    { name: 'add_icon', path: 'filled' },

    { name: 'link_click' },
    { name: 'link' },
    { name: 'mail_receive' },
    { name: 'share' },
    { name: 'mail_outlined' },
    { name: 'sms_outlined' },
    { name: 'sms_receive' },

    { name: 'edit', path: 'filled' },
    { name: 'star', path: 'filled' },
    { name: 'lock_new_icon', path: 'filled' },
    { name: 'lock_icon', path: 'outlined' },

    { name: 'lock_fill', path: 'filled' },
    { name: 'google_icon', path: 'filled' },
    { name: 'Brand Logo', path: 'filled' },
    { name: 'generate_caption', path: 'filled' },

    { name: 'link' },
    { name: 'unlink' },

    { name: 'information', path: 'filled' },
    { name: 'close_icon_blue' },
    { name: 'going_up' },
    { name: 'tavor', path: 'filled' },
    { name: 'down_arrow' },
    { name: 'star_outlined' },
    { name: 'show_icon' },
    { name: 'hide_icon' },
    { name: 'error_icon' },
    { name: 'thumb-down-down', path: 'filled' },
    { name: 'thumb-down-up', path: 'filled' },
    { name: 'neutral 1', path: 'filled' },

    { name: 'smile 1', path: 'filled' },
    { name: 'unhappy 1', path: 'filled' },
    { name: 'copy_keyboard', path: 'filled' },
    { name: 'otp_figma', path: 'filled' },
    { name: 'Google', path: 'filled' },

    { name: 'customization_invite_customber', path: 'filled' },

    { name: 'Numbers', path: 'filled' },
    { name: 'qustion_mark', path: 'filled' },
    { name: 'google_icon', path: 'filled' },
    { name: 'copy_key_bord', path: 'filled' },
    { name: 'download_icon', path: 'filled' },
    { name: 'm2webwolutionbackground', path: 'filled' },
    { name: 'm2webwolution', path: 'filled' },

    { name: 'QR_Code', path: 'filled' },
    { name: 'm2solutionlike', path: 'filled' },
    { name: 'm2solutiondislike', path: 'filled' },
    { name: 'm2websolutionlogo_svg', path: 'filled' },
    { name: 'review_start_active', path: 'filled' },
    { name: 'review_start_inactive', path: 'filled' },
    { name: 'review_screen_neutral', path: 'filled' },
    { name: 'review_screen_unhappy', path: 'filled' },
    { name: 'review_screen_smile', path: 'filled' },
    { name: 'invite_customber_bg_img', path: 'filled' },
    { name: 'download_yellow', path: 'filled' },

    { name: 'close_grey' },
    { name: 'not_qualto_icon', path: 'filled' },
    { name: 'delete_warring_icon', path: 'filled' },
    { name: 'ziper', path: 'filled' },
    { name: 'intigrately', path: 'filled' },
    { name: 'logout', path: 'filled' },

    { name: 'isn', path: 'filled' },
    { name: 'jobber', path: 'filled' },
    { name: 'quickbooks', path: 'filled' },

    { name: 'pabbly', path: 'filled' },
    { name: 'email_widgets_background', path: 'filled' },
    { name: 'copy_key_bord_white', path: 'filled' },
    { name: 'nps_number', path: 'filled' },
    { name: 'question_mark_blue', path: 'filled' },
    { name: 'bradcrum_next_arrow', path: 'filled' },
    { name: 'download_vector', path: 'filled' },
    { name: 'three_dot_icon', path: 'filled' },

    { name: 'search_icon', path: 'filled' },
    { name: 'search_icon_grey', path: 'filled' },

    { name: 'next_icon', path: 'filled' },
    { name: 'smail_emoji_icon', path: 'filled' },
    { name: 'download_with_line', path: 'filled' },
    { name: 'download_with_line', path: 'filled' },

    { name: 'jobber_sky', path: 'filled' },
    { name: 'isn_blue', path: 'filled' },
    { name: 'jobber_navi', path: 'filled' },
    { name: 'ziper_black', path: 'filled' },
    { name: 'quickbooks_black', path: 'filled' },
    { name: 'start_orage_border', path: 'filled' },
    { name: 'star_grey', path: 'filled' },
    { name: 'edit_underscor', path: 'filled' },
    { name: 'tags_delete_red', path: 'filled' },
    { name: 'i_icon_set_limit', path: 'filled' },

    { name: 'message', path: 'filled' },
    { name: 'subtract', path: 'filled' },
    { name: 'table_user_icon', path: 'filled' },
    { name: 'user_used_out', path: 'filled' },
    { name: 'yellow_border_i_cion', path: 'filled' },
    { name: 'atm_icon', path: 'filled' },
    { name: 'atm_left_icon', path: 'filled' },
    { name: 'download_white_icon', path: 'filled' },
    { name: 'status_right_icon', path: 'filled' },
    { name: 'right_redius_active', path: 'filled' },
    { name: 'right_redius_inactive', path: 'filled' },
    { name: 'tick_square', path: 'filled' },

    { name: 'prev_grey_icon' },
    { name: 'next_grey_icon' },
    { name: 'image_icon' },
    { name: 'delete_icon' },
    { name: 'up_arrow' },

    { name: 'calendar' },
    { name: 'accounts', path: 'filled' },
    { name: 'check_box', path: 'filled' },
    { name: 'community', path: 'filled' },
    { name: 'message_small', path: 'filled' },
    { name: 'location', path: 'filled' },
    { name: 'counter_add_icon', path: 'filled' },
    { name: 'counter_minus_icon', path: 'filled' },
    { name: 'update_sms', path: 'filled' },

    { name: 'three_dot_icon' },
    { name: 'red_cross' },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  init() {
    this.iconList.forEach((i) => {
      this.matIconRegistry.addSvgIcon(
        i.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          i.filePath
            ? i.filePath
            : `assets/svg/icons/${i.path ? i.path : 'outlined'}/${i.name}.svg`
        )
      );
    });
  }
}
