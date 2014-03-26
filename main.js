/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** extension to generate JSDoc annotations for functions */
define(function (require, exports, module) {

    'use strict';


    var CommandManager      = brackets.getModule("command/CommandManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager"),
        Menus               = brackets.getModule("command/Menus");


    var EMPTY_MSG   = "No function found";
    var COMMAND_ID  = "annotate.annotate";
    var MENU_NAME   = "Annotate function";
    
    var REGEX_PATTERNS = {
        comment: '\\/\\*.*\\*\\/',
        jsVariable: '[$A-Za-z_][0-9A-Za-z_$]*'
    };

    function insert(input) {
        
        var editor = EditorManager.getCurrentFullEditor();
        var pos    = editor.getCursorPos();
        pos.ch = 0;
 
        editor._codeMirror.replaceRange(input, pos);

        EditorManager.focusEditor();
        
    }
    
    
    /**
     * Generate comment block
     */
    function generateComment() {
        
        var output = [];
        output.push("/**");
        output.push(" * Description");
        output.push(" * ");
        output.push(" * @param type name Description");
        output.push(" * @returns type Description");
        output.push(" * @return type Description\n");
        output.push(" */");
        
        insert(output.join("\n") + "\n");
    }


    CommandManager.register(MENU_NAME, COMMAND_ID, generateComment);
    KeyBindingManager.addBinding(COMMAND_ID, "Ctrl-Alt-A");

    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID);//"menu-edit-annotate", 

});
