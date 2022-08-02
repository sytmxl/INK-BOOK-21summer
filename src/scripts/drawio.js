/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 20s06-2020, Gaudenz Alder
 */
const col = require("element-ui/packages/col");
module.exports = {
    DiagramEditor
}

function DiagramEditor(config, ui, done, initialized, urlParams)
{
    this.config = (config != null) ? config : this.config;
    this.ui = (ui != null) ? ui : this.ui;
    this.done = (done != null) ? done : this.done;
    this.initialized = (initialized != null) ? initialized : this.initialized;
    this.urlParams = urlParams;

    var self = this;

    this.handleMessageEvent = function(evt)
    {
        if (self.frame != null && evt.source == self.frame.contentWindow &&
            evt.data.length > 0)
        {
            try
            {
                var msg = JSON.parse(evt.data);

                if (msg != null)
                {
                    self.handleMessage(msg);
                }
            }
            catch (e)
            {
                console.error(e);
            }
        }
    };
}

DiagramEditor.umlDefaultProject = "data:image/pngs;base64,iVBORw0KGgoAAAANSUhEUgAAAI8AAACkCAYAAACuCH1mAAAAAXNSR0IArs4c6QAABDt0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJlbWJlZC5kaWFncmFtcy5uZXQlMjIlMjBtb2RpZmllZCUzRCUyMjIwMjItMDgtMDFUMDklM0ExOCUzQTUxLjAxNlolMjIlMjBhZ2VudCUzRCUyMjUuMCUyMChXaW5kb3dzJTIwTlQlMjAxMC4wJTNCJTIwV2luNjQlM0IlMjB4NjQpJTIwQXBwbGVXZWJLaXQlMkY1MzcuMzYlMjAoS0hUTUwlMkMlMjBsaWtlJTIwR2Vja28pJTIwQ2hyb21lJTJGMTAzLjAuNTA2MC4xMzQlMjBTYWZhcmklMkY1MzcuMzYlMjBFZGclMkYxMDMuMC4xMjY0Ljc3JTIyJTIwdmVyc2lvbiUzRCUyMjIwLjIuMiUyMiUyMGV0YWclM0QlMjJkVllGN3JDNjJ3NkhTQ0JkZUdzWSUyMiUyMHR5cGUlM0QlMjJlbWJlZCUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMm9pXzU1R2t3MlBNMV9iT09xUU1NJTIyJTIwbmFtZSUzRCUyMiVFNyVBQyVBQyUyMDElMjAlRTklQTElQjUlMjIlM0VqWk5MYjlzd0RNYyUyRmphJTJCRkgwbmFIdWM4dXN2UVF3NDdheFpyQ1pGRmc1YnJwSjklMkJsQ1clMkZNQlNZRHpiMUkwVlQ1RjlKY1d6dWJ5UmE5UXNsbUNSUDVUMHBUa21lNyUyRmZQJTJGUGJnRWNBaHl3T29TY3VBMGdWYzlSY0VtRTIwMXhLNnlBSnlpTWJwZGdzcnRCWXF0MkdDQ0lkdDJBY2F1UUd0cUdGVGhnZlhTaGo0SiUyQnkzbGs0RiUyQnBJJTJGTCUyRnduNkZwTmY4NE9yOEhUaUNrNEp1NlVrRGlzVUhGT2lpTWh1bUExOXlNWTM3dHRYeTdmZU9mQ0NLejdudzJ4NzUlMkZDOVBGc3NTNzNtQTdMSmJiZXRPajRVdzVLTzdpMm92SnM0UEV5VTY0eHZNclklMkZDT3FXMDNZVyUyRm5lTzZNdFJQNkIxaDNSSUkxSmkzUjhtRXRCdDNmT3BwM1hRdnFVN24yd05tWVZmTGxjWGt0dVRkazV3aHRN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"

/**
 * Static method to edit the diagram in the given img or object.
 */
DiagramEditor.editElement = function(elt, config, ui, done, urlParams)
{
    if (!elt.diagramEditorStarting)
    {
        elt.diagramEditorStarting = true;

        return new DiagramEditor(config, ui, done, function()
        {
            delete elt.diagramEditorStarting;
        }, urlParams).editElement(elt);
    }
};

/**
 * Global configuration.
 */
DiagramEditor.prototype.config = null;

/**
 * Protocol and domain to use.
 */
DiagramEditor.prototype.drawDomain = 'https://embed.diagrams.net/';
//DiagramEditor.prototype.drawDomain = 'https://localhost:8080/';

    /**
 * UI theme to be use.
 */
DiagramEditor.prototype.ui = 'min';

/**
 * Contains XML for pending image export.
 */
DiagramEditor.prototype.xml = null;

/**
 * Format to use.
 */
DiagramEditor.prototype.format = 'xml';

/**
 * Specifies if libraries should be enabled.
 */
DiagramEditor.prototype.libraries = true;

/**
 * CSS style for the iframe.
 */
DiagramEditor.prototype.frameStyle = 'position:absolute;border:0;width:100%;height:100%;';

/**
 * Adds the iframe and starts editing.
 */
DiagramEditor.prototype.editElement = function(elem)
{
    var src = this.getElementData(elem);
    this.startElement = elem;
    var fmt = this.format;

    if (src.substring(0, 15) === 'data:image/png;')
    {
        fmt = 'xmlpng';
    }
    else if (src.substring(0, 19) === 'data:image/svg+xml;' ||
        elem.nodeName.toLowerCase() == 'svg')
    {
        fmt = 'xmlsvg';
    }

    this.startEditing(src, fmt);

    return this;
};

/**
 * Adds the iframe and starts editing.
 */
DiagramEditor.prototype.getElementData = function(elem)
{
    var name = elem.nodeName.toLowerCase();
    console.log(elem.getAttribute((name == 'svg') ? 'content' :
        ((name == 'img') ? 'src' : 'data')))
    return elem.getAttribute((name == 'svg') ? 'content' :
        ((name == 'img') ? 'src' : 'data'));
};

/**
 * Adds the iframe and starts editing.
 */
DiagramEditor.prototype.setElementData = function(elem, data)
{
    var name = elem.nodeName.toLowerCase();
    console.log(data.substring(data.indexOf(',') + 1))
    if (name == 'svg')
    {
        elem.outerHTML = atob(data.substring(data.indexOf(',') + 1));
    }
    else
    {
        elem.setAttribute((name == 'img') ? 'src' : 'data', data);
    }

    return elem;
};

/**
 * Starts the editor for the given data.
 */
DiagramEditor.prototype.startEditing = function(data, format, title)
{
    if (this.frame == null)
    {
        window.addEventListener('message', this.handleMessageEvent);
        this.format = (format != null) ? format : this.format;
        this.title = (title != null) ? title : this.title;
        this.data = data;

        this.frame = this.createFrame(
            this.getFrameUrl(),
            this.getFrameStyle());
        document.body.appendChild(this.frame);
        this.setWaiting(true);
    }
};

/**
 * Updates the waiting cursor.
 */
DiagramEditor.prototype.setWaiting = function(waiting)
{
    if (this.startElement != null)
    {
        // Redirect cursor to parent for SVG and object
        var elt = this.startElement;
        var name = elt.nodeName.toLowerCase();


        if (name == 'svg' || name == 'object')
        {
            elt = elt.parentNode;
        }

        if (elt != null)
        {
            if (waiting)
            {
                this.frame.style.pointerEvents = 'none';
                this.previousCursor = elt.style.cursor;
                elt.style.cursor = 'wait';
            }
            else
            {
                elt.style.cursor = this.previousCursor;
                this.frame.style.pointerEvents = '';
            }
        }
    }
};

/**
 * Updates the waiting cursor.
 */
DiagramEditor.prototype.setActive = function(active)
{
    if (active)
    {
        this.previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    }
    else
    {
        document.body.style.overflow = this.previousOverflow;
    }
};

/**
 * Removes the iframe.
 */
DiagramEditor.prototype.stopEditing = function()
{
    if (this.frame != null)
    {
        window.removeEventListener('message', this.handleMessageEvent);
        document.body.removeChild(this.frame);
        this.setActive(false);
        this.frame = null;
    }
};

/**
 * Send the given message to the iframe.
 */
DiagramEditor.prototype.postMessage = function(msg)
{
    if (this.frame != null)
    {
        this.frame.contentWindow.postMessage(JSON.stringify(msg), '*');
    }
};

/**
 * Returns the diagram data.
 */
DiagramEditor.prototype.getData = function()
{
    return this.data;
};

/**
 * Returns the title for the editor.
 */
DiagramEditor.prototype.getTitle = function()
{
    return this.title;
};

/**
 * Returns the CSS style for the iframe.
 */
DiagramEditor.prototype.getFrameStyle = function()
{
    return this.frameStyle + ';left:' +
        document.body.scrollLeft + 'px;top:' +
        document.body.scrollTop + 'px;';
};

/**
 * Returns the URL for the iframe.
 */
DiagramEditor.prototype.getFrameUrl = function()
{
    let url = this.drawDomain + '?embed=1&proto=json&spin=1&noSaveBtn=1';
    if (this.ui != null)
    {
        url += '&ui=' + this.ui;
    }

    if (this.libraries != null)
    {
        url += '&libraries=1';
    }

    if (this.config != null)
    {
        url += '&configure=1';
    }

    if (this.urlParams != null)
    {
        url += '&' + this.urlParams.join('&');
    }

    return url;
};

/**
 * Creates the iframe.
 */
DiagramEditor.prototype.createFrame = function(url, style)
{
    var frame = document.createElement('iframe');
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('style', style);
    frame.setAttribute('src', url);

    return frame;
};

/**
 * Sets the status of the editor.
 */
DiagramEditor.prototype.setStatus = function(messageKey, modified)
{
    this.postMessage({action: 'status', messageKey: messageKey, modified: modified});
};

/**
 * Handles the given message.
 */
DiagramEditor.prototype.handleMessage = function(msg)
{
    if (msg.event == 'configure')
    {
        this.configureEditor();
    }
    else if (msg.event == 'init')
    {
        this.initializeEditor();
    }
    else if (msg.event == 'autosave')
    {
        this.save(msg.xml, true, this.startElement);
    }
    else if (msg.event == 'export')
    {
        this.setElementData(this.startElement, msg.data);
        this.stopEditing();
        this.xml = null;
    }
    else if (msg.event == 'save')
    {
        this.save(msg.xml, false, this.startElement);
        this.xml = msg.xml;

        if (msg.exit)
        {
            msg.event = 'exit';
        }
        else
        {
            this.setStatus('allChangesSaved', false);
        }
    }

    if (msg.event == 'exit')
    {
        if (this.format != 'xml')
        {
            if (this.xml != null)
            {
                this.postMessage({action: 'export', format: this.format,
                    xml: this.xml, spinKey: 'export'});
            }
            else
            {
                this.stopEditing(msg);
            }
        }
        else
        {
            if (msg.modified == null || msg.modified)
            {
                this.save(msg.xml, false, this.startElement);
            }

            this.stopEditing(msg);
        }
    }
};

/**
 * Posts configure message to editor.
 */
DiagramEditor.prototype.configureEditor = function()
{
    this.postMessage({action: 'configure', config: this.config});
};

/**
 * Posts load message to editor.
 */
DiagramEditor.prototype.initializeEditor = function()
{
    this.postMessage({action: 'load',autosave: 1, saveAndExit: '1',
        modified: 'unsavedChanges', xml: this.getData(),
        title: this.getTitle()});
    this.setWaiting(false);
    this.setActive(true);
    this.initialized();
};

/**
 * Saves the given data.
 */
DiagramEditor.prototype.save = function(data, draft, elt)
{
    this.done(data, draft, elt);
};

/**
 * Invoked after save.
 */
DiagramEditor.prototype.done = function()
{
    console.log(this.data)
    //TODO： 在这里向后端发送this.data即可
};

/**
 * Invoked after the editor has sent the init message.
 */
DiagramEditor.prototype.initialized = function()
{
    // hook for subclassers
};
