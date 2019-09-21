<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        ul {
            margin-bottom: 20px;
        }

        .form_group {
            margin-bottom: 10px;
        }

    </style>
</head>

<body>
    <ul>
        @foreach ($news as $news_item)
        <li>
            <p>{{ $news_item->id }} &nbsp; <span>{{ $news_item->created_at }}</span> </p>
            <p>{{ $news_item->text }}</p>
            <form action="{{ url('news/'.$news_item->id) }}" method="POST">
                {{ csrf_field() }}
              {{ method_field('DELETE') }}
                <button type="submit">delete this</button>
            </form>
        </li>
        @endforeach
    </ul>
    <form action="{{ url('news') }}" method="POST">
        <div class="form_group">
            <label for="title">label</label>
            <input type="text" name="title">
        </div>
        <div class="form_group">
            <label for="text">text</label>
            <textarea name="text" cols="30" rows="10"></textarea>
        </div>
        <div class="form_group">
           <button type="submit">save</button>
        </div>
    </form>
</body>

</html>
