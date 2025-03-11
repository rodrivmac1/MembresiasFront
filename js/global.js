(function ($) {
    'use strict';

    $(document).ready(function () {
        $('.js-select-simple').each(function () {
            const selectBox = $(this).find('select');
            const selectDropdown = $(this).find('.select-dropdown');
            
            if (selectBox.length && selectDropdown.length) {
                selectBox.select2({ dropdownParent: selectDropdown });
            }
        });
    });

})(jQuery);