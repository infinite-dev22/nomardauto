import Document from '@tiptap/extension-document';
import Mention from '@tiptap/extension-mention';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { useEditor, EditorContent } from '@tiptap/react';
import { fromTextToTipTapJsonContent } from '../../lib/flow-canvas-utils';


const example = {
  "value": "{{trigger}} {{step_1}} {{step_2}} {{step_3}} {{step_4}} {{step_4['formName']['myName']}} hello I am human, \nhello \nhello \n{{trigger['channelName']}}",
  "metadata": [
    {
      "label": "New Video In Channel",
      "value": "{{trigger}}",
      "step": {
        "name": "trigger",
        "valid": false,
        "displayName": "New Video In Channel",
        "type": "PIECE_TRIGGER",
        "settings": {
          "pieceName": "@activepieces/piece-youtube",
          "pieceVersion": "~0.3.4",
          "pieceType": "OFFICIAL",
          "packageType": "REGISTRY",
          "triggerName": "new-video",
          "input": {},
          "inputUiInfo": {}
        },
        "nextAction": {
          "name": "step_1",
          "type": "CODE",
          "valid": true,
          "settings": {
            "input": {
              "link": "{{trigger['link']}}"
            },
            "sourceCode": {
              "code": "import { YoutubeTranscript } from 'youtube-transcript';\n\nexport const code = async (inputs) => {\n    try {\n        const youtubeUrl = inputs.link.trim(); // Trim to ensure clean URL\n        const videoId = new URL(youtubeUrl).searchParams.get(\"v\");\n\n        if (!videoId) {\n            return 'Invalid YouTube URL';\n        }\n\n        // Fetch the transcript using youtube-transcript API\n        const transcript = await YoutubeTranscript.fetchTranscript(videoId);\n\n        if (transcript) {\n            // Return only the transcript text\n            return transcript.map(entry => entry.text).join(' ');\n        } else {\n            return 'No transcript available for this video.';\n        }\n    } catch (error) {\n        console.error('Error retrieving or parsing the video page:', error);\n        return 'Failed to retrieve the transcript.';\n    }\n};\n",
              "packageJson": "{\n  \"dependencies\": {\n    \"youtube-transcript\": \"1.2.1\"\n  }\n}"
            },
            "inputUiInfo": {},
            "errorHandlingOptions": {
              "retryOnFailure": {
                "value": false
              },
              "continueOnFailure": {
                "value": false
              }
            }
          },
          "nextAction": {
            "name": "step_2",
            "type": "CODE",
            "valid": true,
            "settings": {
              "input": {
                "html": "{{step_1}}"
              },
              "sourceCode": {
                "code": "import { htmlToText } from 'html-to-text';\nimport he from 'he';\n\n\nexport const code = async (input) => {\n       const decodedHtml = he.decode(input.html);\n    // Convert HTML to plain text using html-to-text library\n    const plainText = await htmlToText(decodedHtml, {\n        wordwrap: false, // Disable word wrapping\n        ignoreHref: true, // Ignore anchor tags and URLs\n        ignoreImage: true, // Ignore image tags\n        preserveNewlines: true, // Preserve newlines (convert <br> tags to newlines)\n        uppercaseHeadings: false, // Do not convert headings to uppercase\n    });\n\n    return plainText;\n};",
                "packageJson": "{\n  \"dependencies\": {\n    \"html-to-text\": \"9.0.5\",\n    \"he\": \"1.2.0\"\n  }\n}"
              },
              "inputUiInfo": {},
              "errorHandlingOptions": {
                "retryOnFailure": {
                  "value": false
                },
                "continueOnFailure": {
                  "value": false
                }
              }
            },
            "nextAction": {
              "name": "step_4",
              "type": "PIECE",
              "valid": false,
              "settings": {
                "input": {},
                "pieceName": "@activepieces/piece-forms",
                "pieceType": "OFFICIAL",
                "actionName": "return_file",
                "inputUiInfo": {
                  "customizedInputs": {}
                },
                "packageType": "REGISTRY",
                "pieceVersion": "~0.1.0",
                "errorHandlingOptions": {
                  "retryOnFailure": {
                    "value": false
                  },
                  "continueOnFailure": {
                    "value": false
                  }
                }
              },
              "nextAction": {
                "displayName": "Insert Row",
                "name": "step_3",
                "valid": false,
                "type": "PIECE",
                "settings": {
                  "input": {
                    "include_team_drives": false,
                    "sheet_id": "{{trigger}} {{step_1}} {{step_2}} {{step_3}} {{step_4}} {{step_4['formName']['myName']}} hello I am human, \nhello \nhello \n{{trigger['channelName']}}",
                    "as_string": false,
                    "first_row_headers": false,
                    "values": {}
                  },
                  "pieceName": "@activepieces/piece-google-sheets",
                  "pieceType": "OFFICIAL",
                  "actionName": "insert_row",
                  "inputUiInfo": {
                    "customizedInputs": {
                      "sheet_id": true
                    }
                  },
                  "packageType": "REGISTRY",
                  "pieceVersion": "~0.10.5",
                  "errorHandlingOptions": {
                    "retryOnFailure": {
                      "value": false
                    },
                    "continueOnFailure": {
                      "value": false
                    }
                  }
                }
              },
              "displayName": "Respond with a file"
            },
            "displayName": "Convert any HTML to Text"
          },
          "displayName": "Transcribe Youtube Video"
        },
        "indexInDfsTraversal": 1
      },
      "logoUrl": "https://cdn.activepieces.com/pieces/youtube.png"
    },
    {
      "label": "Transcribe Youtube Video",
      "value": "{{step_1}}",
      "step": {
        "name": "step_1",
        "type": "CODE",
        "valid": true,
        "settings": {
          "input": {
            "link": "{{trigger['link']}}"
          },
          "sourceCode": {
            "code": "import { YoutubeTranscript } from 'youtube-transcript';\n\nexport const code = async (inputs) => {\n    try {\n        const youtubeUrl = inputs.link.trim(); // Trim to ensure clean URL\n        const videoId = new URL(youtubeUrl).searchParams.get(\"v\");\n\n        if (!videoId) {\n            return 'Invalid YouTube URL';\n        }\n\n        // Fetch the transcript using youtube-transcript API\n        const transcript = await YoutubeTranscript.fetchTranscript(videoId);\n\n        if (transcript) {\n            // Return only the transcript text\n            return transcript.map(entry => entry.text).join(' ');\n        } else {\n            return 'No transcript available for this video.';\n        }\n    } catch (error) {\n        console.error('Error retrieving or parsing the video page:', error);\n        return 'Failed to retrieve the transcript.';\n    }\n};\n",
            "packageJson": "{\n  \"dependencies\": {\n    \"youtube-transcript\": \"1.2.1\"\n  }\n}"
          },
          "inputUiInfo": {},
          "errorHandlingOptions": {
            "retryOnFailure": {
              "value": false
            },
            "continueOnFailure": {
              "value": false
            }
          }
        },
        "nextAction": {
          "name": "step_2",
          "type": "CODE",
          "valid": true,
          "settings": {
            "input": {
              "html": "{{step_1}}"
            },
            "sourceCode": {
              "code": "import { htmlToText } from 'html-to-text';\nimport he from 'he';\n\n\nexport const code = async (input) => {\n       const decodedHtml = he.decode(input.html);\n    // Convert HTML to plain text using html-to-text library\n    const plainText = await htmlToText(decodedHtml, {\n        wordwrap: false, // Disable word wrapping\n        ignoreHref: true, // Ignore anchor tags and URLs\n        ignoreImage: true, // Ignore image tags\n        preserveNewlines: true, // Preserve newlines (convert <br> tags to newlines)\n        uppercaseHeadings: false, // Do not convert headings to uppercase\n    });\n\n    return plainText;\n};",
              "packageJson": "{\n  \"dependencies\": {\n    \"html-to-text\": \"9.0.5\",\n    \"he\": \"1.2.0\"\n  }\n}"
            },
            "inputUiInfo": {},
            "errorHandlingOptions": {
              "retryOnFailure": {
                "value": false
              },
              "continueOnFailure": {
                "value": false
              }
            }
          },
          "nextAction": {
            "name": "step_4",
            "type": "PIECE",
            "valid": false,
            "settings": {
              "input": {},
              "pieceName": "@activepieces/piece-forms",
              "pieceType": "OFFICIAL",
              "actionName": "return_file",
              "inputUiInfo": {
                "customizedInputs": {}
              },
              "packageType": "REGISTRY",
              "pieceVersion": "~0.1.0",
              "errorHandlingOptions": {
                "retryOnFailure": {
                  "value": false
                },
                "continueOnFailure": {
                  "value": false
                }
              }
            },
            "nextAction": {
              "displayName": "Insert Row",
              "name": "step_3",
              "valid": false,
              "type": "PIECE",
              "settings": {
                "input": {
                  "include_team_drives": false,
                  "sheet_id": "{{trigger}} {{step_1}} {{step_2}} {{step_3}} {{step_4}} {{step_4['formName']['myName']}} hello I am human, \nhello \nhello \n{{trigger['channelName']}}",
                  "as_string": false,
                  "first_row_headers": false,
                  "values": {}
                },
                "pieceName": "@activepieces/piece-google-sheets",
                "pieceType": "OFFICIAL",
                "actionName": "insert_row",
                "inputUiInfo": {
                  "customizedInputs": {
                    "sheet_id": true
                  }
                },
                "packageType": "REGISTRY",
                "pieceVersion": "~0.10.5",
                "errorHandlingOptions": {
                  "retryOnFailure": {
                    "value": false
                  },
                  "continueOnFailure": {
                    "value": false
                  }
                }
              }
            },
            "displayName": "Respond with a file"
          },
          "displayName": "Convert any HTML to Text"
        },
        "displayName": "Transcribe Youtube Video",
        "indexInDfsTraversal": 2
      },
      "logoUrl": "https://cloud.activepieces.com/assets/img/custom/piece/code.svg"
    },
    {
      "label": "Convert any HTML to Text",
      "value": "{{step_2}}",
      "step": {
        "name": "step_2",
        "type": "CODE",
        "valid": true,
        "settings": {
          "input": {
            "html": "{{step_1}}"
          },
          "sourceCode": {
            "code": "import { htmlToText } from 'html-to-text';\nimport he from 'he';\n\n\nexport const code = async (input) => {\n       const decodedHtml = he.decode(input.html);\n    // Convert HTML to plain text using html-to-text library\n    const plainText = await htmlToText(decodedHtml, {\n        wordwrap: false, // Disable word wrapping\n        ignoreHref: true, // Ignore anchor tags and URLs\n        ignoreImage: true, // Ignore image tags\n        preserveNewlines: true, // Preserve newlines (convert <br> tags to newlines)\n        uppercaseHeadings: false, // Do not convert headings to uppercase\n    });\n\n    return plainText;\n};",
            "packageJson": "{\n  \"dependencies\": {\n    \"html-to-text\": \"9.0.5\",\n    \"he\": \"1.2.0\"\n  }\n}"
          },
          "inputUiInfo": {},
          "errorHandlingOptions": {
            "retryOnFailure": {
              "value": false
            },
            "continueOnFailure": {
              "value": false
            }
          }
        },
        "nextAction": {
          "name": "step_4",
          "type": "PIECE",
          "valid": false,
          "settings": {
            "input": {},
            "pieceName": "@activepieces/piece-forms",
            "pieceType": "OFFICIAL",
            "actionName": "return_file",
            "inputUiInfo": {
              "customizedInputs": {}
            },
            "packageType": "REGISTRY",
            "pieceVersion": "~0.1.0",
            "errorHandlingOptions": {
              "retryOnFailure": {
                "value": false
              },
              "continueOnFailure": {
                "value": false
              }
            }
          },
          "nextAction": {
            "displayName": "Insert Row",
            "name": "step_3",
            "valid": false,
            "type": "PIECE",
            "settings": {
              "input": {
                "include_team_drives": false,
                "sheet_id": "{{trigger}} {{step_1}} {{step_2}} {{step_3}} {{step_4}} {{step_4['formName']['myName']}} hello I am human, \nhello \nhello \n{{trigger['channelName']}}",
                "as_string": false,
                "first_row_headers": false,
                "values": {}
              },
              "pieceName": "@activepieces/piece-google-sheets",
              "pieceType": "OFFICIAL",
              "actionName": "insert_row",
              "inputUiInfo": {
                "customizedInputs": {
                  "sheet_id": true
                }
              },
              "packageType": "REGISTRY",
              "pieceVersion": "~0.10.5",
              "errorHandlingOptions": {
                "retryOnFailure": {
                  "value": false
                },
                "continueOnFailure": {
                  "value": false
                }
              }
            }
          },
          "displayName": "Respond with a file"
        },
        "displayName": "Convert any HTML to Text",
        "indexInDfsTraversal": 3
      },
      "logoUrl": "https://cloud.activepieces.com/assets/img/custom/piece/code.svg"
    },
    {
      "label": "Respond with a file",
      "value": "{{step_4}}",
      "step": {
        "name": "step_4",
        "type": "PIECE",
        "valid": false,
        "settings": {
          "input": {},
          "pieceName": "@activepieces/piece-forms",
          "pieceType": "OFFICIAL",
          "actionName": "return_file",
          "inputUiInfo": {
            "customizedInputs": {}
          },
          "packageType": "REGISTRY",
          "pieceVersion": "~0.1.0",
          "errorHandlingOptions": {
            "retryOnFailure": {
              "value": false
            },
            "continueOnFailure": {
              "value": false
            }
          }
        },
        "nextAction": {
          "displayName": "Insert Row",
          "name": "step_3",
          "valid": false,
          "type": "PIECE",
          "settings": {
            "input": {
              "include_team_drives": false,
              "sheet_id": "{{trigger}} {{step_1}} {{step_2}} {{step_3}} {{step_4}} {{step_4['formName']['myName']}} hello I am human, \nhello \nhello \n{{trigger['channelName']}}",
              "as_string": false,
              "first_row_headers": false,
              "values": {}
            },
            "pieceName": "@activepieces/piece-google-sheets",
            "pieceType": "OFFICIAL",
            "actionName": "insert_row",
            "inputUiInfo": {
              "customizedInputs": {
                "sheet_id": true
              }
            },
            "packageType": "REGISTRY",
            "pieceVersion": "~0.10.5",
            "errorHandlingOptions": {
              "retryOnFailure": {
                "value": false
              },
              "continueOnFailure": {
                "value": false
              }
            }
          }
        },
        "displayName": "Respond with a file",
        "indexInDfsTraversal": 4
      },
      "logoUrl": "https://cdn.activepieces.com/pieces/forms.png"
    }
  ]
}
// figure out a way to insert mentions dynamically in the editor
// figure out a way to parse the output of the editor to get text
// figure out a way to parse the input into a json object for the editor

// define your extension array
const extensions = [
  Document,
  Paragraph.configure({
    HTMLAttributes: {
      class: 'text-base leading-[30px]',
    }
  }),
  Text,
  Mention.configure({ 
    suggestion:{
      char:''
    },
    renderHTML({ node }) {
      // Creating the main div element
      const mentionElement = document.createElement('span');
      mentionElement.className = 'bg-[#fafafa] border border-[#9e9e9e] border-solid items-center gap-2 py-1 px-2 rounded-[3px]  ';
     
      
      if(node.attrs.label.logoUrl){
         // Creating the image element
        const imgElement = document.createElement('img');
        imgElement.src = node.attrs.label.logoUrl;
        imgElement.className = 'object-fit w-4 h-4';
      // Adding the image element to the main div
      mentionElement.appendChild(imgElement);
      }
      
      // Creating the second child div element
      const mentiontextDiv = document.createElement('div');
      mentiontextDiv.className = 'text-base text-accent-foreground leading-[18px]';
      mentiontextDiv.textContent = node.attrs.label.displayText;
      mentionElement.setAttribute('serverValue', node.attrs.label.serverValue);
      
      // Adding the text div to the main div
      mentionElement.appendChild(mentiontextDiv);
      return mentionElement;
    },
  }),
];

export const TextInputWithMentions = ({ className,originalValue }: { className: string, originalValue:string }) => {
  const content = [fromTextToTipTapJsonContent(originalValue??'',[])];
  const editor = useEditor({
    extensions,
    content: {
      type: 'doc',
      content:content,
    },
    editorProps: {
      attributes: {
        class: className,
      },
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      {JSON.stringify(editor?.getJSON(), null, 2)}
    </>
  );
};