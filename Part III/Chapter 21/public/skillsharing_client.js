const handleAction = (state, action) => {
    if (action.type == 'setUser') {
        localStorage.setItem('userName', action.user);
        return Object.assign({}, state, {user: action.user});
    } else if (action.type == 'setTalks') {
        return Object.assign({}, state, {talks: action.talks});
    } else if (action.type == 'newTalk') {
        fetchOK(talkURL(action.title), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                presenter: state.user,
                summary: action.summary
            })
        }).catch(reportError);
    } else if (action.type == 'deleteTalk') {
        fetchOK(talkURL(action.talk), {method: 'DELETE'}).catch(reportError);
    } else if (action.type == 'newComment') {
        fetchOK(talkURL(action.talk) + '/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                author: state.user,
                message: action.message
            })
        }).catch(reportError);
    }
    return state;
};

const fetchOK = (url, options) => {
    return fetch(url, options).then(response => {
        if (response.status < 400) return response;
        else throw new Error(response.statusText);
    });
};

const talkURL = title => {
    return 'talks/' + encodeURIComponent(title);
};

const reportError = error => {
    alert(String(error));
};

const renderUserField = (name, dispatch) => {
    return elt('label', {}, 'Your name: ', elt('input', {
        type: 'text',
        value: name,
        onchange(event) {
            dispatch({type: 'setUser', user: event.target.value});
        }
    }));
};

const elt = (type, props, ...children) => {
    let dom = document.createElement(type);
    if (props) Object.assign(dom, props);

    for (let child of children) {
        if (typeof child != 'string') dom.appendChild(child);
        else dom.appendChild(document.createTextNode(child));
    }
    return dom;
};

const renderTalk = (talk, dispatch) => {
    return elt(
        'section', {className: 'talk'},
        elt('h2', null, talk.title, ' ', elt('button', {
            type: 'button',
            onclick() {
                dispatch({type: 'deleteTalk', talk: talk.title});
            }
        }, 'Delete')),
        elt('div', null, 'by ',
            elt('strong', null, talk.presenter)),
        elt('p', null, talk.summary),
        ...talk.comments.map(renderComment),
        elt('form', {
            onsubmit(event) {
                event.preventDefault();
                let form = event.target;
                dispatch({type: 'newComment',
                          talk: talk.title,
                          message: form.elements.comment.value});
                form.reset();
            }
        }, elt('input', {type: 'text', name: 'comment'}), ' ',
           elt('button', {type: 'submit'}, 'Add comment')));
};

const renderComment = comment => {
    return elt('p', {className: 'comment'},
                elt('strong', null, comment.author),
                ': ', comment.message);
};

const renderTalkForm = dispatch => {
    let title = elt('input', {type: 'text'});
    let summary = elt('input', {type: 'text'});
    return elt('form', {
        onsubmit(event) {
            event.preventDefault();
            dispatch({type: 'newTalk',
                      title: title.value,
                      summary: summary.vlaue});
            event.target.reset();
        }
    }, elt('h3', null, 'Submit a Talk'),
       elt('label', null, 'Title: ', title),
       elt('label', null, 'Summary: ', summary),
       elt('button', {type: 'submit'}, 'Submit'));
};

const pollTalks = async update => {
    let tag = undefined;

    for (;;) {
        let response;

        try {
            response = await fetchOK('/talks', {
                headers: tag && {'If-None-Match': tag,
                                 'Prefer': 'wait=90'}
            });
        } catch (e) {
            console.log('Request failed: ' + e);
            await new Promise(resolve => setTimeout(resolve, 500));
            continue;
        }

        if (response.status == 304) continue;
        tag = response.headers.get('ETag');
        update(await response.json());
    }
};

/* class SkillShareApp {
    constructor(state, dispatch) {
        this.dispatch = dispatch;
        this.talkDOM = elt('div', {className: 'talks'});
        this.dom = elt('div', null,
                       renderUserField(state.user, dispatch),
                       this.talkDOM,
                       renderTalkForm(dispatch));
        this.syncState(state);
    }

    syncState(state) {
        if (state.talks != this.talks) {
            this.talkDOM.textContent = '';
            for (let talk of state.talks) {
                this.talkDOM.appendChild(renderTalk(talk, this.dispatch));
            }
            this.talks = state.talks;
        }
    }
}; */

const runApp = () => {
    let user = localStorage.getItem('userName') || 'Anon';
    let state, app;
    const dispatch = action => {
        state = handleAction(state, action);
        app.syncState(state);
    }

    pollTalks(talks => {
        if (!app) {
            state = {user, talks};
            app = new SkillShareApp(state, dispatch);
            document.body.appendChild(app.dom);
        } else {
            dispatch({type: 'setTalks', talks});
        }
    }).catch(reportError);
};


//********************************** Exercises **********************************//

// Comment Field Resets

//****************************** Author's Solution ******************************//
class Talk {
    consturctor(talk, dispatch) {
        this.comments = elt('div');
        this.dom = elt(
            'section', {className: 'talk'},
            elt('h2', null, talk.title, ' ', elt('button', {
                type: 'button',
                onclick: () => dispatch({type: 'deleteTalk',
                                         talk: talk.title})
            }, 'Delete')),
            elt('div', null, 'by ',
                elt('strong', null, talk.presenter)),
            elt('p', null, talk.summary),
            this.comments,
            elt('form', {
                onsubmit(event) {
                    event.preventDefault();
                    let form = event.target;
                    dispatch({type: 'newComment',
                              talk: talk.title,
                              message: form.elements.comment.value});
                    form.reset();
                }
            }, elt('input', {type: 'text', name: 'comment'}), ' ',
               elt('button', {type: 'submit'}, 'Add comment')));
        this.syncState(talk);
    }

    syncState(talk) {
        this.talk = talk;
        this.comments.textContent = '';
        for (let comment of talk.comments) {
            this.comments.appendChild(renderComment(comment));
        }
    }
};

class SkillShareApp {
    constructor(state, dispatch) {
        this.dispatch = dispatch;
        this.talkDOM = elt('div', {className: 'talks'});
        this.talkMap = Object.create(null);
        this.dom = elt('div', null,
                       renderUserField(state.user, dispatch),
                       this.talkDOM,
                       renderTalkForm(dispatch));
        this.syncState(state);
    }

    syncState(state) {
        if (state.talks == this.talks) return;
        this.talks = state.talks;
        
        for (let talk of state.talks) {
            let cmp = this.talkMap[talk.title];
            if (cmp && cmp.talk.author == talk.author && cmp.talk.summary == talk.summary) {
                cmp.syncState(talk);
            } else {
                if (cmp) cmp.dom.remove();
                cmp = new Talk(talk, this.dispatch);
                this.talkMap[talk.title] = cmp;
                this.talkDOM.appendChild(cmp.dom);
            }
        }

        for (let title of Object.keys(this.talkMap)) {
            if (!state.talks.some(talk => talk.title == title)) {
                this.talkMap[title].dom.remove();
                delete this.talkMap[title];
            }
        }
    }
};

runApp();
//*******************************************************************************//