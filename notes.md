   {part && (
              <Col>
                <Paragraph style={{ margin: "0 1em 0 1em", fontSize: "1.5em" }}>
                  {part}
                </Paragraph>
              </Col>
            )}
            {partIndex < parts.length - 1 && (
              <Col span={3}>
                <Input
                  ref={inputRef}
                  style={{
                    maxWidth: "100%",
                    color: "#000000",
                    fontSize: "1.5em",
                  }}
                  value={
                    answerValue[currentTask._id]
                      ? answerValue[currentTask._id][partIndex] || ""
                      : ""
                  }
                  onChange={(e) =>
                    handleInputChange(currentTask._id, partIndex, e.target.value)
                  }
                  placeholder="Antwort..."
                />
                {/* <Input
                  style={{
                    maxWidth: "100%",
                    color: "#000000",
                    fontSize: "1.5em",
                  }}
                  value={
                    answerValue[currentTask._id]
                      ? answerValue[currentTask._id][partIndex] || ""
                      : ""
                  }
                  onChange={(e) =>
                    handleInputChange(e, currentTask._id, partIndex)
                  }
                  placeholder="Antwort..."
                /> */}
              </Col>
            )}


             <Flex justify="center" align="center" style={{ marginTop: "2.5em" }}>
        {parts.map((part, partIndex) => (
          <React.Fragment key={partIndex}>
          </React.Fragment>
        ))}
      </Flex>