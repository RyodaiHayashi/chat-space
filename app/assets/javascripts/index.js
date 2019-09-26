    $(function() {

        function buildHTML(user){

                var html = 
            `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
            </div>`
                return html;
            }

        function ErrmsgHTML(errmsg){

                var html = 
            `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${errmsg}</p>
            </div>`
                return html;
            }



        $(".js-user-search-field").on("keyup", function() {
        var input = $(".js-user-search-field").val();
        $.ajax({
            type: 'GET',
            url: '/users',
            data: { keyword: input },
            dataType: 'json'
        })

        .done(function(users) {
            $(".js-user-seaerch-result").empty();
            if (users.length !== 0) {
                users.forEach(function(user){
                var html = buildHTML(user);
                $(".js-user-seaerch-result").append(html);
            });
        }
        else {
            var html = ErrmsgHTML("ユーザー検索に失敗しました")
            $(".js-user-seaerch-result").append(html);
        }
        })
        });
    });

    function clickHTML (userName, userId ){
        var html = 
        `<div class='chat-group-user'>
        <input name='group[user_ids][]' type='hidden' value=${userId}>
        <p class='chat-group-user__name'>${userName}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
        </div>`
        return html;
    }


    $(document).on("click", ".user-search-add", function () {
        const userName = $(this).data('user-name');
        const userId = $(this).data('user-id');
        $(this).parent().remove();
        var html = clickHTML (userName, userId  );
        $("#chat-group-users").append(html);
    });

    $('.chat-group-user').on('click', 'chat-group-user__btn', function() {
        const removedUserId = $(this).siblings('input').val();
        userIds = userIds.filter(id => id != removedUserId);
        $(this).parent().remove();
        })

        $(document).on("click", ".user-search-remove", function () {
        $(this).parent().remove();
        })