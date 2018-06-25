(function(angular) {
    // 工具条
    var app = angular.module('tool', []);
    app.controller('listController', ['$scope', function($scope) {
        var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
            CURRENT_Hash = window.location.hash,
            $BODY = $('body'),
            $MENU_TOGGLE = $('#menu_toggle'),
            $SIDEBAR_MENU = $('#sidebar-menu'),
            $SIDEBAR_FOOTER = $('.sidebar-footer'),
            $LEFT_COL = $('.left_col'),
            $RIGHT_COL = $('.right_col'),
            $NAV_MENU = $('.nav_menu'),
            $FOOTER = $('footer');

        //设置用户名
        var USER =  sessionStorage.getItem('user');
           if(USER){
             var $UNAME = JSON.parse(USER).user;
                $('.name').html($UNAME);
           }else{
                 // window.location.href = 'login';
           }
        // 工具条
        function init_sidebar() {
            // TODO: 这是一种简单的解决方法，也许我们可以改进这个
            var setContentHeight = function() {
                // reset height
                $RIGHT_COL.css('min-height', $(window).height());

                var bodyHeight = $BODY.outerHeight(),
                    footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
                    leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
                    contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;
                // normalize content
                contentHeight -= $NAV_MENU.height() + footerHeight+34;
                    console.log(contentHeight);

                $RIGHT_COL.css('min-height', contentHeight);
            };

            $SIDEBAR_MENU.find('a').on('click', function(ev) {
                console.log('clicked - sidebar_menu');
                var $li = $(this).parent();
                var $lisiblings = $li.siblings();
                if ($li.is('.active')) {
                    $li.removeClass('active active-sm');
                    $('ul:first', $li).slideUp(function() {
                        setContentHeight();
                    });
                } else {
                    // prevent closing menu if we are on child menu
                    if (!$li.parent().is('.child_menu')) {
                        $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                        $SIDEBAR_MENU.find('li ul').slideUp();
                    } else {
                        if ($BODY.is(".nav-sm")) {
                            $SIDEBAR_MENU.find("li").removeClass("active active-sm");
                            $SIDEBAR_MENU.find("li ul").slideUp();
                        }
                    }
                    $li.addClass('active');
                    $lisiblings.removeClass('active');
                    $('ul:first', $li).slideDown(function() {
                        setContentHeight();
                    });
                }
            });

            // 切换小或大菜单
            $MENU_TOGGLE.on('click', function() {
                console.log('clicked - menu toggle');

                if ($BODY.hasClass('nav-md')) {
                    $SIDEBAR_MENU.find('li.active ul').hide();
                    $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
                } else {
                    $SIDEBAR_MENU.find('li.active-sm ul').show();
                    $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
                }

                $BODY.toggleClass('nav-md nav-sm');

                setContentHeight();

                $('.dataTable').each(function() { $(this).dataTable().fnDraw(); });
            });

            // check active menu
            $SIDEBAR_MENU.find('a[href$="' + CURRENT_Hash + '"]').parents('li').addClass('active').parents('ul').slideDown(function() {
                setContentHeight();
            }).parent().addClass('active')
            $SIDEBAR_MENU.find('a').filter(function() {
                return this.href == CURRENT_URL;
            })

            // recompute content when resizing
            $(window).smartresize(function() {
                setContentHeight();
            });

            setContentHeight();

            // fixed sidebar
            if ($.fn.mCustomScrollbar) {
                $('.menu_fixed').mCustomScrollbar({
                    autoHideScrollbar: true,
                    theme: 'minimal',
                    mouseWheel: { preventDefault: true }
                });
            }
        };

        init_sidebar();





    }])

})(angular)