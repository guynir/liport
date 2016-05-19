/*******************************************************************************************
 *
 * Liport -- Lightweight import framework.
 *
 * Copyright (c) 2016 Guy Raz Nir
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *******************************************************************************************/

"use strict";

(function () {

// Register an event listener after content is loaded, to start applying contents from imported LINKs.
    document.addEventListener("DOMContentLoaded", loadImportedContents);

    /**
     * Load contents from all importing LINK elements and apply them on body elements.
     */
    function loadImportedContents() {
        // Fetch list of all known importing links.
        var importedContents = document.querySelectorAll('link[rel="import"]');

        // For each link - fetch contents and apply.
        for (var i = 0; i < importedContents.length; i++) {
            var link = importedContents[i];
            if (link.import !== null) {
                // Link already loaded its contents. Apply contents immediately.
                applyImportedData(link);
            } else {
                // Link did not load contents yet, register a listener to apply contents after link is loaded.
                link.addEventListener('load', linkLoadedHandler);
            }
        }
    }

    /**
     * Simple wrapper that handles link-loaded event and delegate call to underlying apply-imported-data function.
     */
    function linkLoadedHandler(event) {
        applyImportedData(event.path[0]);
    }

    /**
     * Apply contents from a given link into body elements. The correlation is done based on 'data-view-name' attribute.
     *
     * @param link Link to apply contents from.
     */
    function applyImportedData(link) {
        // Extract view name from LINK element.
        var viewName = link.getAttribute('data-view-name');
        if (viewName === undefined || viewName.length == 0) {
            console.error("Warning: No view name defined for imported link with URL '" + link.baseURL + "'.");
            return;
        }

        // Fetch list of target elements to apply contents on.
        var targetEls = document.body.querySelectorAll("body [data-view-name='" + viewName + "']");
        if (targetEls.length == 0) {
            console.error("Warning: No element found for view name: '" + viewName + "' (URL '" + link.baseURL + "').");
            return;
        }

        // Apply contents on all body elements containing the relevant view name.
        var contents = link.import.body.innerHTML;
        for (var i = 0; i < targetEls.length; i++) {
            targetEls[i].innerHTML = contents;
        }
    }
}).call();




