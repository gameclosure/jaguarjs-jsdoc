$(function () {
    // On load
    function onHashChange() {
        var hash = window.location.hash;
        if (hash && hash.length > 1) {
            hash = hash.substring(1, hash.length);

            // Get each item from the nav
            var items = document.getElementsByClassName('item');
            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                // Go through each li in that item (methods, etc)
                var subItems = item.getElementsByTagName('li');
                for (var j = 0; j < subItems.length; j++) {
                    var subItem = subItems[j];
                    subItem.classList.remove('selected');

                    // Check to see if this is the new hash
                    var datasetHash = subItem.dataset.name.split('#')[1];
                    if (new RegExp(hash + '$').test(subItem.dataset.name)) {
                        subItem.classList.add('selected');
                    }
                }
            }
        }
    }

    // Check for compatibility
    if ("onhashchange" in window) {
        $(window).bind('hashchange', onHashChange);
    }

    // On document ready
    $(document).ready(function() {
        onHashChange();

        // Select the proper item in the navbar
        var longname = $('.page-title').data('longname');

        var items = document.getElementsByClassName('item');
        for (var i = 0; i < items.length; i++) {
            var item = items[i],
                name = item.dataset.name;
            item.classList.remove('selected');

            // Check to see if this is the new hash
            if (name === longname) {
                item.classList.add('selected');
            }
        }
    });

    // Expand all the folded regions
    $('.expandable-toggle').on('click', function(e) {
        var self = $(e.currentTarget);
        self.parent().toggleClass('folded');
    });

    // Search Items
    $('#search').on('keyup', function (e) {
        var value = $(this).val();
        var $el = $('.navigation');

        if (value) {
            var regexp = new RegExp(value, 'i');
            $el.find('li, .itemMembers').hide();

            $el.find('li').each(function (i, v) {
                var $item = $(v);

                var dataName = $item.data('name');
                if (dataName && regexp.test(dataName)) {
                    $item.show();
                    $item.closest('.itemMembers').show();
                    $item.closest('.item').show();
                }
            });
        } else {
            // Search field is empty, reset
            $el.find('.item').each(function (i, v) {
                var $item = $(v);
                $item.show();
                $item.find('.itemMembers').hide();
            });
        }

        $el.find('.list').scrollTop(0);
    });

    // Toggle when click an item element
    $('.navigation').on('click', '.title', function (e) {
        $(this).parent().find('.itemMembers').toggle();
    });

    // Show an item related a current documentation automatically
    var longname = $('.page-title').data('longname');
    var $currentItem = $('.navigation .item[data-name="' + longname + '"]:eq(0)');

    if ($currentItem.length) {
        $currentItem
            .remove()
            .prependTo('.navigation .list')
            .show()
            .find('.itemMembers')
            .show();
    }

    // Auto resizing on navigation
    var _onResize = function () {
        var height = $(window).height();
        var $el = $('.navigation');

        $el.height(height).find('.list').height(height - 133);
    };

    $(window).on('resize', _onResize);
    _onResize();

    // disqus code
    if (config.disqus) {
        $(window).on('load', function () {
            var disqus_shortname = config.disqus; // required: replace example with your forum shortname
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            var s = document.createElement('script'); s.async = true;
            s.type = 'text/javascript';
            s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
            document.getElementsByTagName('BODY')[0].appendChild(s);
        });
    }
});