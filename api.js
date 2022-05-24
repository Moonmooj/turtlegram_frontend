const backend_base_url = "http://127.0.0.1:5000"
const frontend_base_url = "http://127.0.0.1:5500"


async function handleSignin() {

    const signupData = {
        email: document.getElementById('floatingInput').value,
        password: document.getElementById('floatingPassword').value
    }

    const response = await fetch(`${backend_base_url}/signup`, {
        method: 'POST',
        body: JSON.stringify(signupData)
    })
    console.log(response)

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}`)
    } else {
        alert(response.message)
    }
}

async function handleLogin() {
    console.log('handle login')

    const loginData = {
        email: document.getElementById('floatingInput').value,
        password: document.getElementById('floatingPassword').value
    }

    const response = await fetch(`${backend_base_url}/login`, {
        method: 'POST',
        body: JSON.stringify(loginData)
    })
    console.log(response)

    response_json = await response.json()
    console.log(response_json)
    localStorage.setItem("token", response_json.token)

}

async function getName() {

    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })

    if (response.status == 200) {
        response_json = await response.json()
        console.log(response_json)
        return response_json

    } else {
        return null;
    }
}

async function postArticle(title, content) {
    const articleData = {
        title: title,
        content: content
    }
    console.log(articleData)

    const response = await fetch(`${backend_base_url}/article`, {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(articleData)
    })

    response_json = await response.json()
    console.log(response_json)

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }
}

async function getArticles() {
    const response = await fetch(`${backend_base_url}/article`, {
        method: 'GET',

    })

    response_json = await response.json()
    return response_json.articles
}

function logout() {
    localStorage.removeItem('token')
    window.location.replace(`${frontend_base_url}/`);
}

function articleDetail(article_id) {
    console.log(article_id)
    const url = `${frontend_base_url}/article_detail.html?id=${article_id}`
    location.href = url
}

async function getArticleDetail(article_id) {
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        method: 'GET'
    }
    )
    response_json = await response.json()
    console.log(response_json)

    return response_json.article
}

async function patchArticle(article_id, title, content) {
    const articleData = {
        'title': title,
        'content': content
    }

    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        method: 'PATCH',
        body: JSON.stringify(articleData)
    })

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

async function deleteArticle() {
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        method: 'DELETE'
    })

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`)
    } else {
        alert(response.status)
    }
}

async function postComment(article_id, comment_content) {
    const commentData = {
        'content': comment_content
    }
    const response = await fetch(`${backend_base_url}/article/${article_id}/comment`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        method: 'POST',
        body: JSON.stringify(commentData)
    })

    if (response.status == 200) {
        return response
    } else {
        alert(response.status)
    }
}