import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'jquery.terminal/css/jquery.terminal.min.css';
// import 'https://code.jquery.com/ui/1.12.1/themes/cupertino/jquery-ui.css';
// import 'https://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css';

import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery.terminal';

import './shell.css';
// import './font-awesome.min.css';
import './jquery-ui.css';
import './shell.min.css';
function Shell() {
    const [type, setType] = useState('ubuntu');
    const [dark, setDark] = useState(true);

    useEffect(() => {
        // Script for shell.js
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/jcubic/static/js/wcwidth.js';
        document.body.appendChild(script);

        script.onload = () => {
            var shell = $('.shell').resizable({
                minHeight: 108,
                minWidth: 250
            }).draggable({
                handle: '> .status-bar .title'
            });

            // Fake in memory filesystem
            var fs = {
                'projects': {
                    'baz.txt': 'Hello this is file baz.txt',
                    'quux.txt': "Lorem Ispum (quux.txt)",
                    'foo.txt': "Hello, World!",
                    'bar.txt': "Wellcome to the bar",
                    "terminal": {
                        "foo": {
                            "bar.txt": "hello bar",
                            "baz.txt": "baz content"
                        }
                    }
                }
            };

            var path = [];
            var cwd = fs;

            function restore_cwd(fs, path) {
                path = path.slice();
                while (path.length) {
                    var dir_name = path.shift();
                    if (!is_dir(fs[dir_name])) {
                        throw new Error('Internal Error Invalid directory ' +
                            $.terminal.escape_brackets(dir_name));
                    }
                    fs = fs[dir_name];
                }
                return fs;
            }

            function is_dir(obj) {
                return typeof obj === 'object';
            }

            function is_file(obj) {
                return typeof obj === 'string';
            }

            var commands = {
                cd: function (dir) {
                    this.pause();
                    if (dir === '/') {
                        path = [];
                        cwd = restore_cwd(fs, path);
                    } else if (dir === '..') {
                        if (path.length) {
                            path.pop(); // remove from end
                            cwd = restore_cwd(fs, path);
                        }
                    } else if (dir.match(/\//)) {
                        var p = dir.replace(/\/$/, '').split('/').filter(Boolean);
                        if (dir[0] !== '/') {
                            p = path.concat(p);
                        }
                        cwd = restore_cwd(fs, p);
                        path = p;
                    } else if (!is_dir(cwd[dir])) {
                        this.error($.terminal.escape_brackets(dir) + ' is not a directory');
                    } else {
                        cwd = cwd[dir];
                        path.push(dir);
                    }
                    this.resume();
                },
                ls: function () {
                    if (!is_dir(cwd)) {
                        throw new Error('Internal Error Invalid directory');
                    }
                    var dir = Object.keys(cwd).map(function (key) {
                        if (is_dir(cwd[key])) {
                            return key + '/';
                        }
                        return key;
                    });
                    this.echo(dir.join('\n'));
                },
                cat: function (file) {
                    if (!is_file(cwd[file])) {
                        this.error($.terminal.escape_brackets(file) + " doesn't exist");
                    } else {
                        this.echo(cwd[file]);
                    }
                },
                help: function () {
                    this.echo('Available commands: ' + Object.keys(commands).join(', '));
                }
            };

            function completion(string, callback) {
                var command = this.get_command();
                var cmd = $.terminal.parse_command(command);

                function dirs(cwd) {
                    return Object.keys(cwd).filter(function (key) {
                        return is_dir(cwd[key]);
                    }).map(function (dir) {
                        return dir + '/';
                    });
                }

                if (cmd.name === 'ls') {
                    callback([]);
                } else if (cmd.name === 'cd') {
                    var p = string.split('/').filter(Boolean);
                    if (p.length === 1) {
                        if (string[0] === '/') {
                            callback(dirs(fs));
                        } else {
                            callback(dirs(cwd));
                        }
                    } else {
                        if (string[0] !== '/') {
                            p = path.concat(p);
                        }
                        if (string[string.length - 1] !== '/') {
                            p.pop();
                        }
                        var prefix = string.replace(/\/[^/]*$/, '');
                        callback(dirs(restore_cwd(fs, p)).map(function (dir) {
                            return prefix + '/' + dir;
                        }));
                    }
                } else if (cmd.name === 'cat') {
                    var files = Object.keys(cwd).filter(function (key) {
                        return is_file(cwd[key]);
                    });
                    callback(files);
                } else {
                    callback(Object.keys(commands));
                }
            }

            var term = $('.content').terminal(commands, {
                prompt: prompt(),
                completion: completion,
                enabled: $('body').attr('onload') === undefined,
            });

            if (!term.enabled()) {
                term.find('.cursor').addClass('blink');
            }

            function prompt(type) {
                return function (callback) {
                    var prompt;
                    if (type === 'windows') {
                        prompt = 'C:\\' + path.join('\\') + '> ';
                    } else {
                        prompt = 'user@host:/' + path.join('/') + '$ ';
                    }
                    $('.title').html(prompt);
                    callback(prompt);
                };
            }

            $('#type').on('change', function () {
                shell.removeClass('osx windows ubuntu default custom').addClass(this.value);
                term.toggleClass('underline-animation', this.value === 'windows');
                term.set_prompt(prompt(this.value));
            });

            $('#dark').on('change', function () {
                shell.removeClass('dark light');
                if (this.checked) {
                    shell.addClass('dark');
                } else {
                    shell.addClass('light');
                }
            });

            $('#type, #dark').on('change', function () {
                setTimeout(function () {
                    term.focus();
                }, 400);
            });
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <form>
                <label htmlFor="type">Window Type:</label>
                <select id="type" defaultValue={type} onChange={(e) => setType(e.target.value)}>
                    <option value="osx">osx</option>
                    <option value="ubuntu">ubuntu</option>
                    <option value="windows">windows</option>
                    <option value="custom">custom</option>
                </select>
                <label htmlFor="dark">dark</label>
                <input
                    type="checkbox"
                    id="dark"
                    checked={dark}
                    onChange={(e) => setDark(e.target.checked)}
                />
            </form>
            <div className={`shell ${type} ${dark ? 'dark' : 'light'} shadow`}>
                <div className="status-bar">
                    {/* <div className="buttons">
                        <a href="javascript:;" className="close" title="Close">
                            <i className="fa fa-times"></i>
                        </a>
                        <a href="javascript:;" className="minimize" title="Minimize">
                            <i className="fa fa-minus"></i>
                        </a>
                        <a href="javascript:;" className="enlarge" title="Enlarge">
                            <i className="fa fa-plus"></i>
                        </a>
                    </div> */}
                    <div className="title">user@host: ~</div>
                </div>
                <div className="content"></div>
            </div>
        </>
    );
}

export default Shell;
