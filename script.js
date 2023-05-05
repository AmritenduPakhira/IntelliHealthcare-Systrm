 
        (function() {
            function invokeScriptExecution() {
                var checkAttribute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                var additionalSessionData = arguments.length > 0 && arguments[1] !== undefined ? arguments[1] : null;
                var value = null;
                var height = "100%";
                var width = "100%";
                var expectedValue = "true";
                var chatbotData = "";
                var sessionData = "";
                var embedMetaData = "";
                var shouldExecuteIntially = "true";
                var meta = document.createElement('meta');
                meta.setAttribute('http-equiv', 'Content-Security-Policy');
                meta.setAttribute('content', 'upgrade-insecure-requests');
                document.getElementsByTagName('head')[0].appendChild(meta);
                script_index = 0;
                for (; script_index < document.getElementsByTagName("script").length; script_index++) {
                    try{
                        if (-1 !== document.getElementsByTagName("script")[script_index].getAttribute("src").indexOf("6875gcHycB8k133229672053c3I5IgLN")) {
                            if (document.getElementsByTagName("script")[script_index].getAttribute("data-chatbot")) {
                                try {
                                    chatbotData = JSON.parse(document.getElementsByTagName("script")[script_index].getAttribute("data-chatbot"));
                                } catch (e) {
                                    console.log("error in chatbot data");
                                }
                            }
                            if ((document.getElementsByTagName("script")[script_index].getAttribute("initOnPageLoad") || document.getElementsByTagName("script")[script_index].getAttribute("data-initOnPageLoad")) && checkAttribute) {
                                shouldExecuteIntially = document.getElementsByTagName("script")[script_index].getAttribute("initOnPageLoad") || document.getElementsByTagName("script")[script_index].getAttribute("data-initOnPageLoad");
                            }
                            if (document.getElementsByTagName("script")[script_index].getAttribute("data-session-payload") || additionalSessionData) {
                                try {
                                    sessionData = JSON.parse(document.getElementsByTagName("script")[script_index].getAttribute("data-session-payload"));
                                    sessionData = {...sessionData, ...additionalSessionData};
                                } catch (e) {
                                    console.log("error in session data");
                                }
                            }
                            if (document.getElementsByTagName("script")[script_index].getAttribute("data-embed-metadata")) {
                                try {
                                    embedMetaData = JSON.parse(document.getElementsByTagName("script")[script_index].getAttribute("data-embed-metadata"));
                                } catch (e) {
                                    console.log("error in embed meta data");
                                }
                            }
                            value = document.getElementsByTagName("script")[script_index].getAttribute("widget-container-id");
                            if (document.getElementsByTagName("script")[script_index].getAttribute("widget-height")) {
                                height = document.getElementsByTagName("script")[script_index].getAttribute("widget-height");
                            }
                            if (document.getElementsByTagName("script")[script_index].getAttribute("widget-width")) {
                                width = document.getElementsByTagName("script")[script_index].getAttribute("widget-width");
                            }
                            if ("true" != (expectedValue = document.getElementsByTagName("script")[script_index].getAttribute("widget-header-visible")) && "false" != expectedValue) {
                                expectedValue = "true";
                            }
                            break;
                        }
                    } catch (e){
                        console.log("No src found in a script tag, might be an inline script or invalid script")
                    }
                }
                if (shouldExecuteIntially === "true") {
                    window.WTNT.hasInitialized = true;
                    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    fetch("".concat("https://app.wotnot.io", "/v2/bot-preference?id=").concat(("6875gcHycB8k133229672053c3I5IgLN" || ""), "&is_source_web_preview=0&timezone=").concat(timezone, "&web_url=").concat(encodeURIComponent(embedMetaData ? window.document.referrer || window.location.href : window.location.href), "&browser_language=").concat(navigator.language || navigator.userLanguage, "&referrer_url=").concat(embedMetaData ? window.document.referrer : window.parent.document.referrer || '', "&script_source=").concat(("https://cdn.wotnot.io/modern-chat-bubble/b88b75b" || "").split('/').slice(-1)[0] || null).concat((embedMetaData && embedMetaData.bot_publish_key) ? "&bot_publish_key=" + embedMetaData.bot_publish_key : ""), {
                        credentials: 'include'
                    }).then(function(res) {
                        return res.json().then(function(data) {
                            if (data.is_active) {
                                var main_div = document.createElement("div");
                                main_div.innerHTML = ' <input type="hidden" value="6875gcHycB8k133229672053c3I5IgLN" class="secret-key" /> <input type="hidden" id="bucket-conversation-attachment" value="wotnot-conversation-attachment"/> <input type="hidden" value="" id="preference-response" /> <input type="hidden" id="wt-referral-url" value=""/>  <div id="chat-bot"></div>  <div id="modal-root" style="height: 100%;width: 100%;border: none;background-color: #000; display: none;position: fixed;top: 0px;z-index: 2147483647;"> </div><iframe id="overlay-iframe" style="height: 100%; width: 100%; border: none; background-color: rgba(0, 0, 0, 0.8); display: none; visibility: hidden; position: fixed; top: 0px; z-index: 2147483647;"> </iframe>';
                                var vendors_main = document.createElement("script");
                                var main = document.createElement("script");
                                vendors_main.src = "https://cdn.wotnot.io/modern-chat-bubble/b88b75b/vendors~main.js";
                                main.src = "https://cdn.wotnot.io/modern-chat-bubble/b88b75b/main.js";
                                main.id = "wotnot-modern-chat-main-url";
                                document.body.appendChild(main_div);
                                document.getElementById('preference-response').value = JSON.stringify(data);
                                document.body.appendChild(vendors_main);
                                document.body.appendChild(main);
                                document.getElementById("wt-referral-url").value = embedMetaData ? window.document.referrer : window.parent.document.referrer;
                                window.addEventListener("message", function(textFile) {
                                    if (textFile.data && function(pStringValue) {
                                            try {
                                                JSON.parse(pStringValue);
                                            } catch (e) {
                                                return false;
                                            }
                                            return true;
                                        }(textFile.data)) {
                                        var options = JSON.parse(textFile.data);
                                        if ("autoOpenChatWindow" == options.type) {
                                            window.Wotnot.open();
                                        }
                                        if (options.type && "bubble-loaded" === options.type) {
                                            if (sessionData) {
                                                window.postMessage(JSON.stringify({
                                                    type: "parameterReceived",
                                                    data: sessionData
                                                }), "*");
                                            }
                                            if (embedMetaData) {
                                                window.postMessage(JSON.stringify({
                                                    type: "embedMetadataReceived",
                                                    data: embedMetaData
                                                }), "*");
                                            }
                                            if (value) {
                                                window.postMessage(JSON.stringify({
                                                    type: "wot_parent_element",
                                                    header_visible: expectedValue,
                                                    height: height,
                                                    width: width,
                                                    parentID: value
                                                }), "*");
                                            }
                                        }
                                        if (options.type && "custom_script" === options.type) {
                                            if (options.message) {
                                                var scriptsPayload = JSON.parse(options.message);
                                                for (var i = 0; i < scriptsPayload.length; i++) {
                                                    var script = document.createElement("script");
                                                    script.type = "text/javascript";
                                                    script.text = scriptsPayload[i]["script"];
                                                    if (scriptsPayload[i]["target"] === "parent") {
                                                        document.body.append(script);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }, false);
                            }
                            else{
                                return "";
                            }
                        });
                    });
                }
            }
            window.WTNT = {
                initChatWidget: invokeScriptExecution
            };
            try {
                var event = new CustomEvent('WTNT-intialization', {
                    detail: window.WTNT.hasInitialized
                });
                window.dispatchEvent(event);
            } catch (error) {
                console.log(error);
            }
        })();
        if ((document.readyState === 'complete' || document.readyState === 'interactive') && !window.WTNT.hasInitialized) {
            window.WTNT.initChatWidget(true);
        }
        window.addEventListener("load", function() {
            if (!window.WTNT.hasInitialized) window.WTNT.initChatWidget(true);
        });
        
            